-- Enable UUID generation helper.
create extension if not exists pgcrypto;

-- Users table used by custom JWT auth in this app.
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('admin', 'user')),
  categories text[] not null default '{}',
  name text not null,
  created_at timestamptz not null default now()
);

-- SOP categories shown in dashboard and admin panel.
create table if not exists public.categories (
  slug text primary key,
  name text not null,
  department text not null,
  description text not null default '',
  accent_hex text not null
);

-- Editable SOP documents. Content is stored as JSON for live admin edits.
create table if not exists public.sop_documents (
  slug text primary key references public.categories(slug) on delete cascade,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

-- Seed default categories.
insert into public.categories (slug, name, department, description, accent_hex)
values
  ('media-buying', 'Media Buying', 'Marketing', 'Meta Ads setup, campaign structure, testing phases, and scaling strategy.', '#8b7ff8'),
  ('image-ads', 'Straight to Kill - Image Ads', 'Creative', 'High-conversion image ad strategy, design specs, and copy frameworks.', '#06d6a0'),
  ('sales-closing', 'Sales Closing', 'Sales', 'Consultative sales process, objection handling, and closing techniques.', '#f97316'),
  ('content-creation', 'Content Creation', 'Creative', 'Video production workflow, scriptwriting, editing guidelines, and publishing.', '#ec4899'),
  ('client-onboarding', 'Client Onboarding', 'Operations', 'Step-by-step client intake, access handover, and first-week checklist.', '#0ea5e9'),
  ('customer-support', 'Customer Support', 'Support', 'Inbox rhythm, 24-hour reply window (WABA), reminders, and FAQ — turn chats into show-ups.', '#f43f5e')
on conflict (slug) do update
set
  name = excluded.name,
  department = excluded.department,
  description = excluded.description,
  accent_hex = excluded.accent_hex;

-- This app uses the anon key from the server without Supabase Auth.
-- Grant access for anon/authenticated roles so existing app flows work.
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.sop_documents enable row level security;

drop policy if exists "users_full_access_anon" on public.users;
create policy "users_full_access_anon"
on public.users
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "categories_full_access_anon" on public.categories;
create policy "categories_full_access_anon"
on public.categories
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "sop_documents_full_access_anon" on public.sop_documents;
create policy "sop_documents_full_access_anon"
on public.sop_documents
for all
to anon, authenticated
using (true)
with check (true);

-- Optional bootstrap admin user.
-- Email: admin@example.com
-- Password: admin123
insert into public.users (email, password_hash, role, categories, name)
values (
  'admin@example.com',
  '$2a$10$HGiymaJTtYieH2eXV/mzwuMMqV3gEZg9F2K7nNKIPQlUzshIJqk0m',
  'admin',
  '{"*"}',
  'Admin'
)
on conflict (email) do nothing;
