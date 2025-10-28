import supabase from "./supabase";

export async function getTodoItems() {
  const { data, error } = await supabase.from("todos_items").select("*");

  if (error) {
    console.error(error);
    throw new Error("Todo Items could not be loaded");
  }
  return data;
}

export async function getTodoItemsTags() {
  const { data, error } = await supabase.from("todos_items").select("tags");

  if (error) {
    console.error(error);
    throw new Error("Todo Items Tags could not be loaded");
  }

  // console.log(`All data: ${JSON.stringify(data)}`);
  let tags = [];
  data.forEach((item) => {
    if (item.tags) {
      item.tags.forEach((tag) => {
        if (tag && (tag?.trim() !== "" || tag?.length > 0))
          tags.push(tag);
      });
    }
  });

  // Get unique tags
  const uniqueTags = [...new Set(tags)];
  // const formattedTags = uniqueTags.map((tag) => ({ tags: tag }));

//  console.log(`Unique Tags: ${JSON.stringify(uniqueTags)}`);

  return uniqueTags;
}


export async function getTodoItemsByList(id) {
//  console.log(`Getting TodoList ID ${id}`);
  const { data, error } = await supabase.from("todos_items").select("*").eq("list_id", id);

  if (error) {
    console.error(error);
    throw new Error("Todo Items could not be loaded");
  }
  return data;
}


export async function getTodoShareItemsByList(list_id, user_id) {
  if (!list_id || !user_id) return [];
//  console.log(`Getting Share TodoItems List ID ${list_id}, User ID: ${user_id}`);
  const { data, error } = await supabase.from("todos_share_items_view")
    .select("*")
    .eq("list_id", list_id)
    .eq("share_to", user_id);

  if (error) {
    console.error(error);
    throw new Error("Todo Items could not be loaded");
  }
  return data;
}


export async function getTodoItem(itemId) {
  const { data, error } = await supabase
    .from("todos_items")
    .select("*")
    .eq("id", itemId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Todo Item could not be loaded");
  }
  return data;
}

export async function createEditTodoItem(newTodoItem, id) {
    let query = supabase.from('todos_items');

    if (!id) {
        // Create new todo item
        query = query.insert([newTodoItem]);
    } else {
        // Edit existing todo item
        query = query.update(newTodoItem).eq('id', id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Todo Item could not be saved");
    }

    return data;
}

export async function deleteTodoItem(id) {
    const { data, error } = await supabase
        .from("todos_items")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Todo Item could not be deleted");
    }
    return data;
}