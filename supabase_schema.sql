-- NEXUS CLOUD DATABASE SCHEMA
-- This file is a BACKUP of your Supabase logic.
-- If you ever lose your database, run this entire file in the SQL Editor to rebuild it.

-- 1. Create the Jobs Table
create table if not exists jobs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text default 'pending', 
  gpu_type text not null,
  node_count int default 1,
  duration_hours int default 1,
  user_id uuid default auth.uid()
);

-- 2. Enable Realtime (So dashboards update)
alter publication supabase_realtime add table jobs;

-- 3. Enable Security
alter table jobs enable row level security;

-- 4. RLS POLICIES (The Rules)

-- Read Access: Everyone can see jobs (for now)
create policy "Enable Read Access for All" 
on jobs for select 
using (true);

-- Insert Access: Only Logged-in Users can create jobs
create policy "Enable Insert for Authenticated Users Only" 
on jobs for insert 
with check (auth.role() = 'authenticated');

-- Delete Access: Only the Creator can delete their jobs
create policy "Enable Delete for Job Owners" 
on jobs for delete 
using (auth.uid() = user_id);

-- Update Access: Only the Creator can update their jobs
create policy "Enable Update for Job Owners" 
on jobs for update 
using (auth.uid() = user_id);
