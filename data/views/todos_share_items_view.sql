
create view public.todos_share_items_view as (
  select 
    i.id,
    i.created_at,
    i.list_id,
    i.name,
    i.description,
    i.url,
    i.tags,
    i.image_url,
    i.checked,
    l.name as list_name,
    l.list_owner,
    l.share_to,
    l.share_level
  FROM 
    public.todos_items i join public.todos_share_list_view l 
    on i.list_id = l.list_id
);
