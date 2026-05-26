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
  ('customer-support', 'Customer Support', 'Support', 'How we handle customer chats, reminders, and common questions.', '#f43f5e'),
  ('automaticsales-overview', 'AutomaticSales — Overview', 'AutomaticSales', 'What AutomaticSales is, how our webinar pipeline works, and how to navigate this SOP.', '#7c3aed'),
  ('automaticsales-session-update', 'AutomaticSales — Session Update', 'AutomaticSales', 'The recurring pre-session checklist: Zoom setup, custom values, Google Sheet, and verification.', '#f59e0b'),
  ('automaticsales-waba', 'AutomaticSales — WABA & Email', 'AutomaticSales', 'Reminder systems, the marketing/utility fallback, fail rates, and manual blast procedure.', '#10b981'),
  ('automaticsales-builder', 'AutomaticSales — Building Automations', 'AutomaticSales', 'How to build and maintain workflows: optin, reminders, Meta CAPI, and new project setup.', '#06b6d4'),
  ('automaticsales-sales', 'AutomaticSales — Sales Tracking', 'AutomaticSales', 'During and post-webinar sales monitoring. Restricted to confirmed staff only.', '#dc2626'),
  ('automaticsales-project-rdp', 'Project Reference — Dr Jasmine (RDP)', 'AutomaticSales', 'RDP-specific reference: reminder sequence, custom values, Zoom setup, and countdown code fix.', '#7c3aed'),
  ('automaticsales-project-cae', 'Project Reference — CAE', 'AutomaticSales', 'CAE-specific reference: 2-day reminder sequence, custom values, Zoom recurring setup, and programme prefixes.', '#7c3aed')
on conflict (slug) do update
set
  name = excluded.name,
  department = excluded.department,
  description = excluded.description,
  accent_hex = excluded.accent_hex;

-- ─── Supabase Auth migration: profiles table ──────────────────────────────────
-- Stores app-specific user data linked to auth.users.
-- Email is denormalised here for efficient querying without Admin API calls.
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  name       text not null,
  role       text not null check (role in ('admin', 'user')) default 'user',
  categories text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- RLS for profiles: service role bypasses automatically; authenticated users can
-- only read their own row. All writes go through the service-role admin client.
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

-- Categories and SOP documents are read by the server-side admin client which
-- bypasses RLS, so permissive policies here are safe fallbacks.
alter table public.categories enable row level security;
alter table public.sop_documents enable row level security;

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
