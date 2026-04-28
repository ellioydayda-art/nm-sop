import { supabase } from "@/lib/supabase";

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
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

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  categories: string[];
  name: string;
  created_at: string;
}

interface CategoryRow {
  slug: string;
  name: string;
  department: string;
  description: string;
  accent_hex: string;
}

interface SopContentRow {
  slug: string;
  content: unknown;
  updated_at: string;
}

function mapUserRow(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
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

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("users")
    .select("id,email,password_hash,role,categories,name,created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }

  return (data ?? []).map((row) => mapUserRow(row as UserRow));
}

export async function getUserById(id: string): Promise<User | undefined> {
  const { data, error } = await supabase
    .from("users")
    .select("id,email,password_hash,role,categories,name,created_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch user by id: ${error.message}`);
  }

  return data ? mapUserRow(data as UserRow) : undefined;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const { data, error } = await supabase
    .from("users")
    .select("id,email,password_hash,role,categories,name,created_at")
    .ilike("email", email)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch user by email: ${error.message}`);
  }

  return data ? mapUserRow(data as UserRow) : undefined;
}

export async function createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .insert({
      email: user.email,
      password_hash: user.passwordHash,
      role: user.role,
      categories: user.categories,
      name: user.name,
    })
    .select("id,email,password_hash,role,categories,name,created_at")
    .single();

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return mapUserRow(data as UserRow);
}

export async function updateUser(
  id: string,
  updates: Partial<Omit<User, "id" | "createdAt">>,
): Promise<User | null> {
  const payload: Partial<UserRow> = {};
  if (typeof updates.email === "string") payload.email = updates.email;
  if (typeof updates.name === "string") payload.name = updates.name;
  if (typeof updates.role === "string") payload.role = updates.role;
  if (Array.isArray(updates.categories)) payload.categories = updates.categories;
  if (typeof updates.passwordHash === "string") payload.password_hash = updates.passwordHash;

  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("id", id)
    .select("id,email,password_hash,role,categories,name,created_at")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }

  return data ? mapUserRow(data as UserRow) : null;
}

export async function deleteUser(id: string): Promise<boolean> {
  const { error, count } = await supabase.from("users").delete({ count: "exact" }).eq("id", id);
  if (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
  return (count ?? 0) > 0;
}

export function userHasAccess(user: User, categorySlug: string): boolean {
  return user.categories.includes("*") || user.categories.includes(categorySlug);
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("slug,name,department,description,accent_hex")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return (data ?? []).map((row) => mapCategoryRow(row as CategoryRow));
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const { data, error } = await supabase
    .from("categories")
    .select("slug,name,department,description,accent_hex")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch category by slug: ${error.message}`);
  }

  return data ? mapCategoryRow(data as CategoryRow) : undefined;
}

export async function updateCategory(
  slug: string,
  updates: Partial<Omit<Category, "slug" | "accentHex">>,
): Promise<boolean> {
  const payload: Partial<CategoryRow> = {};
  if (typeof updates.name === "string") payload.name = updates.name;
  if (typeof updates.department === "string") payload.department = updates.department;
  if (typeof updates.description === "string") payload.description = updates.description;

  const { error, count } = await supabase
    .from("categories")
    .update(payload, { count: "exact" })
    .eq("slug", slug);

  if (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }

  return (count ?? 0) > 0;
}

export async function getSopDocumentBySlug(slug: string): Promise<SopContentRow | null> {
  const { data, error } = await supabase
    .from("sop_documents")
    .select("slug,content,updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch SOP document: ${error.message}`);
  }

  return data ? (data as SopContentRow) : null;
}

export async function upsertSopDocument(slug: string, content: unknown): Promise<void> {
  const { error } = await supabase
    .from("sop_documents")
    .upsert({ slug, content, updated_at: new Date().toISOString() }, { onConflict: "slug" });

  if (error) {
    throw new Error(`Failed to save SOP document: ${error.message}`);
  }
}
