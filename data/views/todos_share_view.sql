drop view public.todos_share_view;

create view public.todos_share_view as (
  select
    s.id,
    s.list_id,
    s.share_to,
    u.name as share_to_user,
    u.email as share_to_email,
    s.share_level
  from
    public.todos_share s left join public.todos_users u
    on s.share_to = u.user_id
);