create view public.todos_share_list_view as (
  select
   l.id as list_id,
   l.user_id as list_owner,
   l.name,
   l.description,
   l.user_id as share_to,
   0 as share_level,
   l.created_at
  from
    public.todos_list l
  union
  select
   l.id as list_id,
   l.user_id as list_owner,
   l.name,
   l.description,
   s.share_to,
   s.share_level,
   l.created_at
  from
    public.todos_list l join public.todos_share s
    on l.id = s.list_id
  where
    s.share_level > 0
);