import supabase from "./supabase";

export async function getTodoShareApi(list_id) {
    if (!list_id) {
        throw new Error("No data provided");
    }
    let query = supabase.from("todos_share_view")
        .select("*")
        .eq("list_id", list_id);

    const { data, error } = await query

    if (error) {
        console.error(error);
        throw new Error("Todo List Sharing could not be loaded");
    }
    return data;
}

export async function updateTodoShareApi(todoShare) {
    console.log(`updating todo share access ${JSON.stringify(todoShare)}`);
    let query = supabase.from('todos_share')
            .update(todoShare).eq('id', todoShare.id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Todo Item could not be saved");
    }

    return data;
}

export async function addTodoShareApi(newTodoShare) {
    const { data, error } = await supabase.from("todos_share")
        .insert([newTodoShare])
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error("Todo Sharing could not be added");
    }
    return data;
}


export async function deleteTodoShareApi(id) {
    if (!id) {
        throw new Error("No data provided");
    }
    let query = supabase.from("todos_share")
        .delete()
        .eq("id", id);

    const { data, error } = await query

    if (error) {
        console.error(error);
        throw new Error("Todo Sharing could not be deleted");
    }
    return data;
}
