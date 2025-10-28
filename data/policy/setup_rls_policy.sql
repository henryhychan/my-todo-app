BEGIN;
    -- todos_users
    create policy "Enable read access for authenticated" on "public"."todos_users" as PERMISSIVE
    for SELECT to authenticated using (true);

    create policy "Enable update access for authenticated" on "public"."todos_users" as PERMISSIVE
    for UPDATE to authenticated using (true) with check (true);

    create policy "Enable insert access for authenticated" on "public"."todos_users" as PERMISSIVE
    for insert to authenticated with check (true);

    create policy "Enable delete access for authenticated" on "public"."todos_users" as PERMISSIVE
    for delete to authenticated using (true);

    -- todos_list
    create policy "Enable delete access for authenticated" on "public"."todos_list" as PERMISSIVE
    for delete to authenticated using (true);

    create policy "Enable read access for authenticated" on "public"."todos_list" as PERMISSIVE
    for SELECT to authenticated using (true);

    create policy "Enable update access for authenticated" on "public"."todos_list" as PERMISSIVE
    for UPDATE to authenticated using (true) with check (true);

    create policy "Enable insert access for authenticated" on "public"."todos_list" as PERMISSIVE
    for insert to authenticated with check (true);

    -- todos_items
    create policy "Enable delete access for authenticated" on "public"."todos_items" as PERMISSIVE
    for delete to authenticated using (true);

    create policy "Enable read access for authenticated" on "public"."todos_items" as PERMISSIVE
    for SELECT to authenticated using (true);

    create policy "Enable update access for authenticated" on "public"."todos_items" as PERMISSIVE
    for UPDATE to authenticated using (true) with check (true);

    create policy "Enable insert access for authenticated" on "public"."todos_items" as PERMISSIVE
    for insert to authenticated with check (true);

    -- todos_share
    create policy "Enable delete access for authenticated" on "public"."todos_share" as PERMISSIVE
    for delete to authenticated using (true);

    create policy "Enable read access for authenticated" on "public"."todos_share" as PERMISSIVE
    for SELECT to authenticated using (true);

    create policy "Enable update access for authenticated" on "public"."todos_share" as PERMISSIVE
    for UPDATE to authenticated using (true) with check (true);

    create policy "Enable insert access for authenticated" on "public"."todos_share" as PERMISSIVE
    for insert to authenticated with check (true);

COMMIT;