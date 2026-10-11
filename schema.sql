-- ArthaCore Enterprise Payroll System
-- Jalankan skrip ini pada Supabase SQL Editor.
-- ERD berisi tepat empat entitas: departments, positions, employees, payrolls.

create extension if not exists pgcrypto;

create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  manager_name text,
  location text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.positions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  grade text,
  base_salary numeric(15, 2) not null default 0 check (base_salary >= 0),
  allowance numeric(15, 2) not null default 0 check (allowance >= 0),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  employee_code text not null unique,
  full_name text not null,
  company_name text not null default 'Perusahaan Mitra ArthaCore',
  email text,
  phone text,
  department_id uuid references public.departments(id) on update cascade on delete restrict,
  position_id uuid references public.positions(id) on update cascade on delete restrict,
  work_province text,
  minimum_wage numeric(15, 2) check (minimum_wage is null or minimum_wage >= 0),
  join_date date,
  employment_status text not null default 'active'
    check (employment_status in ('active', 'inactive', 'on_leave')),
  base_salary numeric(15, 2) check (base_salary is null or base_salary >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tambahkan kolom perusahaan pada project lama yang tabelnya sudah dibuat.
alter table public.employees
  add column if not exists company_name text not null default 'Perusahaan Mitra ArthaCore';

create table if not exists public.payrolls (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on update cascade on delete restrict,
  period_start date not null,
  period_end date not null,
  basic_salary numeric(15, 2) not null default 0 check (basic_salary >= 0),
  allowance numeric(15, 2) not null default 0 check (allowance >= 0),
  deductions numeric(15, 2) not null default 0 check (deductions >= 0),
  overtime_hours numeric(8, 2) not null default 0 check (overtime_hours >= 0),
  overtime_amount numeric(15, 2) not null default 0 check (overtime_amount >= 0),
  bonus_amount numeric(15, 2) not null default 0 check (bonus_amount >= 0),
  ptkp_status text not null default 'TK/0'
    check (ptkp_status in ('TK/0', 'TK/1', 'TK/2', 'TK/3', 'K/0', 'K/1', 'K/2', 'K/3')),
  pph21_method text not null default 'monthly_ter'
    check (pph21_method in ('monthly_ter', 'annual_reconciliation')),
  pph21_ter_rate numeric(7, 5) not null default 0 check (pph21_ter_rate >= 0),
  previous_gross_ytd numeric(15, 2) not null default 0 check (previous_gross_ytd >= 0),
  previous_pph21_ytd numeric(15, 2) not null default 0 check (previous_pph21_ytd >= 0),
  previous_employee_pension_ytd numeric(15, 2) not null default 0 check (previous_employee_pension_ytd >= 0),
  previous_periods_ytd smallint not null default 11 check (previous_periods_ytd between 0 and 11),
  pph21 numeric(15, 2) not null default 0,
  bpjs_kesehatan_employee numeric(15, 2) not null default 0 check (bpjs_kesehatan_employee >= 0),
  bpjs_kesehatan_employer numeric(15, 2) not null default 0 check (bpjs_kesehatan_employer >= 0),
  bpjs_jht_employee numeric(15, 2) not null default 0 check (bpjs_jht_employee >= 0),
  bpjs_jht_employer numeric(15, 2) not null default 0 check (bpjs_jht_employer >= 0),
  bpjs_jp_employee numeric(15, 2) not null default 0 check (bpjs_jp_employee >= 0),
  bpjs_jp_employer numeric(15, 2) not null default 0 check (bpjs_jp_employer >= 0),
  bpjs_jkk_employer numeric(15, 2) not null default 0 check (bpjs_jkk_employer >= 0),
  bpjs_jkm_employer numeric(15, 2) not null default 0 check (bpjs_jkm_employer >= 0),
  jp_wage_cap numeric(15, 2) not null default 10547400 check (jp_wage_cap >= 0),
  jkk_risk_rate numeric(7, 5) not null default 0.0024
    check (jkk_risk_rate in (0.0024, 0.0054, 0.0089, 0.0127, 0.0174)),
  net_salary numeric(15, 2) generated always as (
    basic_salary + allowance + overtime_amount + bonus_amount
    - deductions - pph21 - bpjs_kesehatan_employee - bpjs_jht_employee - bpjs_jp_employee
  ) stored,
  status text not null default 'pending'
    check (status in ('draft', 'pending', 'paid')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint payroll_period_valid check (period_end >= period_start),
  constraint payroll_net_nonnegative check (
    basic_salary + allowance + overtime_amount + bonus_amount
    >= deductions + pph21 + bpjs_kesehatan_employee + bpjs_jht_employee + bpjs_jp_employee
  ),
  constraint payroll_employee_period_unique unique (employee_id, period_start, period_end)
);

-- Tambahkan komponen payroll dan upah minimum pada project yang telah dibuat sebelumnya.
alter table public.employees
  add column if not exists work_province text,
  add column if not exists minimum_wage numeric(15, 2) check (minimum_wage is null or minimum_wage >= 0);

alter table public.payrolls
  add column if not exists overtime_hours numeric(8, 2) not null default 0 check (overtime_hours >= 0),
  add column if not exists overtime_amount numeric(15, 2) not null default 0 check (overtime_amount >= 0),
  add column if not exists bonus_amount numeric(15, 2) not null default 0 check (bonus_amount >= 0),
  add column if not exists ptkp_status text not null default 'TK/0'
    check (ptkp_status in ('TK/0', 'TK/1', 'TK/2', 'TK/3', 'K/0', 'K/1', 'K/2', 'K/3')),
  add column if not exists pph21_method text not null default 'monthly_ter'
    check (pph21_method in ('monthly_ter', 'annual_reconciliation')),
  add column if not exists pph21_ter_rate numeric(7, 5) not null default 0 check (pph21_ter_rate >= 0),
  add column if not exists previous_gross_ytd numeric(15, 2) not null default 0 check (previous_gross_ytd >= 0),
  add column if not exists previous_pph21_ytd numeric(15, 2) not null default 0 check (previous_pph21_ytd >= 0),
  add column if not exists previous_employee_pension_ytd numeric(15, 2) not null default 0 check (previous_employee_pension_ytd >= 0),
  add column if not exists previous_periods_ytd smallint not null default 11 check (previous_periods_ytd between 0 and 11),
  add column if not exists pph21 numeric(15, 2) not null default 0,
  add column if not exists bpjs_kesehatan_employee numeric(15, 2) not null default 0 check (bpjs_kesehatan_employee >= 0),
  add column if not exists bpjs_kesehatan_employer numeric(15, 2) not null default 0 check (bpjs_kesehatan_employer >= 0),
  add column if not exists bpjs_jht_employee numeric(15, 2) not null default 0 check (bpjs_jht_employee >= 0),
  add column if not exists bpjs_jht_employer numeric(15, 2) not null default 0 check (bpjs_jht_employer >= 0),
  add column if not exists bpjs_jp_employee numeric(15, 2) not null default 0 check (bpjs_jp_employee >= 0),
  add column if not exists bpjs_jp_employer numeric(15, 2) not null default 0 check (bpjs_jp_employer >= 0),
  add column if not exists bpjs_jkk_employer numeric(15, 2) not null default 0 check (bpjs_jkk_employer >= 0),
  add column if not exists bpjs_jkm_employer numeric(15, 2) not null default 0 check (bpjs_jkm_employer >= 0),
  add column if not exists jp_wage_cap numeric(15, 2) not null default 10547400 check (jp_wage_cap >= 0),
  add column if not exists jkk_risk_rate numeric(7, 5) not null default 0.0024
    check (jkk_risk_rate in (0.0024, 0.0054, 0.0089, 0.0127, 0.0174));

-- net_salary is always recomputed from the statutory and other deduction detail.
alter table public.payrolls drop column if exists net_salary;
alter table public.payrolls add column net_salary numeric(15, 2) generated always as (
  basic_salary + allowance + overtime_amount + bonus_amount
  - deductions - pph21 - bpjs_kesehatan_employee - bpjs_jht_employee - bpjs_jp_employee
) stored;
alter table public.payrolls drop constraint if exists payroll_net_nonnegative;
alter table public.payrolls add constraint payroll_net_nonnegative check (
  basic_salary + allowance + overtime_amount + bonus_amount
  >= deductions + pph21 + bpjs_kesehatan_employee + bpjs_jht_employee + bpjs_jp_employee
);

create index if not exists employees_department_id_idx on public.employees(department_id);
create index if not exists employees_position_id_idx on public.employees(position_id);
create index if not exists payrolls_employee_id_idx on public.payrolls(employee_id);
create index if not exists payrolls_period_start_idx on public.payrolls(period_start);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists departments_set_updated_at on public.departments;
create trigger departments_set_updated_at before update on public.departments
for each row execute function public.set_updated_at();

drop trigger if exists positions_set_updated_at on public.positions;
create trigger positions_set_updated_at before update on public.positions
for each row execute function public.set_updated_at();

drop trigger if exists employees_set_updated_at on public.employees;
create trigger employees_set_updated_at before update on public.employees
for each row execute function public.set_updated_at();

drop trigger if exists payrolls_set_updated_at on public.payrolls;
create trigger payrolls_set_updated_at before update on public.payrolls
for each row execute function public.set_updated_at();

alter table public.departments enable row level security;
alter table public.positions enable row level security;
alter table public.employees enable row level security;
alter table public.payrolls enable row level security;

grant usage on schema public to anon;
grant usage on schema public to authenticated;
grant select, insert, update, delete on public.departments to anon;
grant select, insert, update, delete on public.positions to anon;
grant select, insert, update, delete on public.employees to anon;
grant select, insert, update, delete on public.payrolls to anon;
grant select, insert, update, delete on public.departments to authenticated;
grant select, insert, update, delete on public.positions to authenticated;
grant select, insert, update, delete on public.employees to authenticated;
grant select, insert, update, delete on public.payrolls to authenticated;

-- WARNING: anon policies expose all records in this project to anyone with the
-- publishable key. Use a dedicated project and do not store real payroll data.
drop policy if exists "Public demo access departments" on public.departments;
drop policy if exists "Company workspace access departments" on public.departments;
create policy "Company workspace access departments" on public.departments
for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public demo access positions" on public.positions;
drop policy if exists "Company workspace access positions" on public.positions;
create policy "Company workspace access positions" on public.positions
for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public demo access employees" on public.employees;
drop policy if exists "Company workspace access employees" on public.employees;
create policy "Company workspace access employees" on public.employees
for all to anon, authenticated using (true) with check (true);

drop policy if exists "Public demo access payrolls" on public.payrolls;
drop policy if exists "Company workspace access payrolls" on public.payrolls;
create policy "Company workspace access payrolls" on public.payrolls
for all to anon, authenticated using (true) with check (true);
