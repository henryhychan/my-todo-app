import supabase from "./supabase";
import { getCurrentUser } from "./apiAuth.js";

export async function getTodoList(id) {
    const user = await getCurrentUser();
//    console.log(user);

    let query = supabase.from('todos_list')
                .select("todos_list(*), todos_users(user_id)")
                .eq("user_id", user.user.id);

    if (id) {
        query = query.eq("todos_list(id)", id);
    }

//    console.log(query);
    const { data, error } = await query.select();

    if (error) {
        console.error(error);
        throw new Error("Todo List could not be loaded");
    }
    return data;
}

export async function getShareTodoList(id) {
    const user = await getCurrentUser();
//    console.log(user);

    // use shared todo lists
    let query = supabase.from('todos_share_list_view')
                .select("*")
                .eq("share_to", user.user.id);

    if (id) {
        query = query.eq("list_id", id);
    }


//    console.log(query);
    const { data, error } = await query.select();

    if (error) {
        console.error(error);
        throw new Error("Todo List could not be loaded");
    }
    return data;
}

export async function createTodoList(newList) {
    const user = await getCurrentUser();
//    console.log(user);
    const { data, error } = await supabase.from('todos_list')
                .insert([newList])
                .eq("user_id", user.user.id)
                .select();

    if (error) {
        console.error(error);
        throw new Error("Todo List could not be loaded");
    }
    return data;
}

export async function getTodoItems() {
  const { data, error } = await supabase.from("todos_items").select("*");

  if (error) {
    console.error(error);
    throw new Error("Todo Items could not be loaded");
  }
  return data;
}


export async function getTodoShare() {
  const { data, error } = await supabase.from("todos_share").select("*");

  if (error) {
    console.error(error);
    throw new Error("Todo Sharing could not be loaded");
  }
  return data;
}