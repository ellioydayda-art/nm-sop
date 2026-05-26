import { CATEGORIES as BUILTIN_CATEGORIES } from "@/data/categories";
import { createAdminClient } from "@/lib/supabase/admin";

export type UserRole = "admin" | "user";

/**
 * App-level user record. Email is denormalised from auth.users into profiles
 * so it can be queried without a separate Admin API call.
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  categories: string[];
  name: string;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  department: string;
  description: string;
  accentHex: string;
}

/** Raw shape returned by the profiles table. */
interface ProfileRow {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  categories: string[];
  created_at: string;
}

interface CategoryRow {
  slug: string;
  name: string;
  department: string;
  description: string;
  accent_hex: string;
}

export interface SopContentRow {
  slug: string;
  content: unknown;
  updated_at: string;
}

function mapProfileRow(row: ProfileRow): User {
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    categories: row.categories,
    name: row.name,
    createdAt: row.created_at,
  };
}

function mapCategoryRow(row: CategoryRow): Category {
  return {
    slug: row.slug,
    name: row.name,
    department: row.department,
    description: row.description,
    accentHex: row.accent_hex,
  };
}

/** Ensures categories in data/categories.ts always appear even if not yet in DB. */
function mergeCategoriesWithBuiltins(dbCategories: Category[]): Category[] {
  const bySlug = new Map(dbCategories.map((c) => [c.slug, c]));
  for (const b of BUILTIN_CATEGORIES) {
    if (!bySlug.has(b.slug)) {
      bySlug.set(b.slug, {
        slug: b.slug,
        name: b.name,
        department: b.department,
        description: b.description,
        accentHex: b.accentHex,
      });
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// ─── User functions (all use the admin/service-role client) ───────────────────

export async function getUsers(): Promise<User[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id,email,name,role,categories,created_at")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Failed to fetch users: ${error.message}`);
  return (data ?? []).map((row) => mapProfileRow(row as ProfileRow));
}

export async function getUserById(id: string): Promise<User | undefined> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id,email,name,role,categories,created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch user by id: ${error.message}`);
  return data ? mapProfileRow(data as ProfileRow) : undefined;
}

/**
 * Creates a user in Supabase Auth then inserts the matching profile row.
 * Rolls back the auth user if the profile insert fails.
 */
export async function createUser(
  user: Omit<User, "id" | "createdAt"> & { password: string },
): Promise<User> {
  const admin = createAdminClient();

  const { data: authData, error: authError } =
    await admin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      app_metadata: { role: user.role },
    });

  if (authError || !authData.user) {
    throw new Error(`Failed to create auth user: ${authError?.message ?? "unknown error"}`);
  }

  const { data, error: profileError } = await admin
    .from("profiles")
    .insert({
      id: authData.user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      categories: user.categories,
    })
    .select("id,email,name,role,categories,created_at")
    .single();

  if (profileError) {
    // Best-effort rollback of the auth user.
    await admin.auth.admin.deleteUser(authData.user.id);
    throw new Error(`Failed to create profile: ${profileError.message}`);
  }

  return mapProfileRow(data as ProfileRow);
}

/**
 * Updates fields on both auth.users (via Admin API) and public.profiles.
 * Pass `password` (plain text) to change the user's password.
 */
export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id" | "createdAt">> & { password?: string },
): Promise<User | null> {
  const admin = createAdminClient();

  // Sync email, password, and role to the auth.users record.
  const authUpdates: {
    email?: string;
    password?: string;
    app_metadata?: { role: string };
  } = {};
  if (typeof updates.email === "string") authUpdates.email = updates.email;
  if (typeof updates.password === "string") authUpdates.password = updates.password;
  if (typeof updates.role === "string") authUpdates.app_metadata = { role: updates.role };

  if (Object.keys(authUpdates).length > 0) {
    const { error: authError } = await admin.auth.admin.updateUserById(
      id,
      authUpdates,
    );
    if (authError) {
      throw new Error(`Failed to update auth user: ${authError.message}`);
    }
  }

  // Sync the profile row with any updated fields.
  const profileUpdates: Partial<ProfileRow> = {};
  if (typeof updates.email === "string") profileUpdates.email = updates.email;
  if (typeof updates.name === "string") profileUpdates.name = updates.name;
  if (typeof updates.role === "string") profileUpdates.role = updates.role;
  if (Array.isArray(updates.categories)) profileUpdates.categories = updates.categories;

  if (Object.keys(profileUpdates).length === 0) {
    // Nothing changed in the profile; re-read and return current state.
    const current = await getUserById(id);
    return current ?? null;
  }

  const { data, error } = await admin
    .from("profiles")
    .update(profileUpdates)
    .eq("id", id)
    .select("id,email,name,role,categories,created_at")
    .maybeSingle();

  if (error) throw new Error(`Failed to update profile: ${error.message}`);
  return data ? mapProfileRow(data as ProfileRow) : null;
}

/**
 * Deletes a user from Supabase Auth. The profiles row is removed by the
 * ON DELETE CASCADE constraint on the foreign key.
 */
export async function deleteUser(id: string): Promise<boolean> {
  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) throw new Error(`Failed to delete user: ${error.message}`);
  return true;
}

export function userHasAccess(user: User, categorySlug: string): boolean {
  return user.categories.includes("*") || user.categories.includes(categorySlug);
}

// ─── Category functions ───────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("categories")
    .select("slug,name,department,description,accent_hex")
    .order("name", { ascending: true });

  if (error) throw new Error(`Failed to fetch categories: ${error.message}`);

  const fromDb = (data ?? []).map((row) => mapCategoryRow(row as CategoryRow));
  return mergeCategoriesWithBuiltins(fromDb);
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("categories")
    .select("slug,name,department,description,accent_hex")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch category: ${error.message}`);

  if (data) return mapCategoryRow(data as CategoryRow);

  const builtIn = BUILTIN_CATEGORIES.find((c) => c.slug === slug);
  if (builtIn) {
    return {
      slug: builtIn.slug,
      name: builtIn.name,
      department: builtIn.department,
      description: builtIn.description,
      accentHex: builtIn.accentHex,
    };
  }
  return undefined;
}

export async function updateCategory(
  slug: string,
  updates: Partial<Omit<Category, "slug" | "accentHex">>,
): Promise<boolean> {
  const admin = createAdminClient();
  const payload: Partial<CategoryRow> = {};
  if (typeof updates.name === "string") payload.name = updates.name;
  if (typeof updates.department === "string") payload.department = updates.department;
  if (typeof updates.description === "string") payload.description = updates.description;

  const { error, count } = await admin
    .from("categories")
    .update(payload, { count: "exact" })
    .eq("slug", slug);

  if (error) throw new Error(`Failed to update category: ${error.message}`);
  return (count ?? 0) > 0;
}

// ─── SOP document functions ───────────────────────────────────────────────────

export async function getSopDocumentBySlug(
  slug: string,
): Promise<SopContentRow | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sop_documents")
    .select("slug,content,updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch SOP document: ${error.message}`);
  return data ? (data as SopContentRow) : null;
}

export async function upsertSopDocument(
  slug: string,
  content: unknown,
): Promise<SopContentRow> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("sop_documents")
    .upsert(
      { slug, content, updated_at: new Date().toISOString() },
      { onConflict: "slug" },
    )
    .select("slug,content,updated_at")
    .single();

  if (error) throw new Error(`Failed to save SOP document: ${error.message}`);
  return data as SopContentRow;
}
