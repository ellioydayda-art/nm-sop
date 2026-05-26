/**
 * One-time migration script: public.users → Supabase Auth + public.profiles
 *
 * For each row in public.users it:
 *   1. Creates a Supabase Auth user with email_confirm = true and a temporary
 *      password of "12345678". Users should change this on first login via /account.
 *   2. Inserts a matching row in public.profiles with name, role, and categories.
 *
 * Usage (run once after deploying the new code):
 *   npx tsx scripts/migrate-to-supabase-auth.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local
 *   - The public.profiles table must already exist (run supabase/init.sql first)
 */

import * as dotenv from "dotenv";
import * as path from "path";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const TEMP_PASSWORD = "12345678";

interface LegacyUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  categories: string[];
  created_at: string;
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Read all legacy users from the old public.users table.
  const { data: legacyUsers, error: fetchError } = await admin
    .from("users")
    .select("id,email,name,role,categories,created_at")
    .order("created_at", { ascending: true });

  if (fetchError) {
    throw new Error(`Failed to read public.users: ${fetchError.message}`);
  }

  if (!legacyUsers || legacyUsers.length === 0) {
    console.log("No users found in public.users. Nothing to migrate.");
    return;
  }

  console.log(`Found ${legacyUsers.length} user(s) to migrate.\n`);

  let successCount = 0;
  let skipCount = 0;

  for (const legacy of legacyUsers as LegacyUser[]) {
    console.log(`Migrating: ${legacy.email} (${legacy.role})`);

    // Create the Supabase Auth user.
    const { data: authData, error: authError } =
      await admin.auth.admin.createUser({
        email: legacy.email,
        password: TEMP_PASSWORD,
        email_confirm: true,
        app_metadata: { role: legacy.role },
      });

    if (authError) {
      if (
        authError.message.toLowerCase().includes("already") ||
        authError.message.toLowerCase().includes("registered")
      ) {
        console.log(`  ⚠  Auth user already exists — skipping auth creation.`);
        // Try to find the existing auth user to upsert the profile.
        const { data: listData } = await admin.auth.admin.listUsers();
        const existing = listData?.users.find((u) => u.email === legacy.email);
        if (!existing) {
          console.log(`  ✗  Could not find existing auth user. Skipping.\n`);
          skipCount++;
          continue;
        }

        // Upsert the profile for the existing auth user.
        const { error: profileErr } = await admin
          .from("profiles")
          .upsert(
            {
              id: existing.id,
              email: legacy.email,
              name: legacy.name,
              role: legacy.role,
              categories: legacy.categories,
            },
            { onConflict: "id" },
          );

        if (profileErr) {
          console.log(`  ✗  Profile upsert failed: ${profileErr.message}\n`);
          skipCount++;
        } else {
          console.log(`  ✓  Profile upserted for existing auth user.\n`);
          successCount++;
        }
        continue;
      }

      console.log(`  ✗  Auth creation failed: ${authError.message}\n`);
      skipCount++;
      continue;
    }

    const newUserId = authData.user.id;

    // Insert the profile row.
    const { error: profileError } = await admin.from("profiles").insert({
      id: newUserId,
      email: legacy.email,
      name: legacy.name,
      role: legacy.role,
      categories: legacy.categories,
    });

    if (profileError) {
      console.log(`  ✗  Profile insert failed: ${profileError.message}`);
      // Roll back the auth user.
      await admin.auth.admin.deleteUser(newUserId);
      console.log(`  ↩  Auth user rolled back.\n`);
      skipCount++;
      continue;
    }

    console.log(`  ✓  Migrated successfully (new auth id: ${newUserId})\n`);
    successCount++;
  }

  console.log("─────────────────────────────────────────");
  console.log(`Migration complete: ${successCount} succeeded, ${skipCount} skipped.`);
  console.log("");
  console.log("All migrated users have a temporary password: 12345678");
  console.log("Direct them to /account to change it after their first login.");

  if (successCount > 0) {
    console.log("");
    console.log(
      "After confirming all users can log in, you may drop the old table:",
    );
    console.log("  DROP TABLE public.users;");
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
