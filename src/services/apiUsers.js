import supabase from "./supabase";

export async function getUsers() {
    const { data, error } = await supabase.from("todos_users").select("*");

    if (error) {
        console.error(error);
        throw new Error("Users could not be loaded");
    }
    return data;
}

export async function getUser(id) {
    const { data: user, error } = await supabase.from("todos_users")
        .select("*")
        .eq("user_id", id)
        .single();

    if (error) {
        console.error(error);
        throw new Error(`User ${id} could not be loaded`);
    }
    return user;
}

export async function createUser({user_id, email, fullName}) {
//    console.log(`Creating a new user with data user_id=${user_id}, email=${email}, name=${fullName}`);

//    const { data } = await supabase.from('todos_users').select('*').eq('user_id', user_id).single();
//    if (data) {
////        console.log(`User ${user_id} already exists`);
//        return data;
//    }

    const {data: insertData, error} = await supabase.from('todos_users')
        .insert([{user_id, email, name: fullName}]).select().single(); // after insert, data will be null, need to use .select() to return
    if (error) {
        console.error(error);
        throw new Error(`User ${user_id} could not be added`);
    }
    return insertData;
}


export async function getCurrentUserProfile({ id }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    // console.log(data);
    return data;
}

export async function getUserByEmail( email ) {
    const { data, error } = await supabase.from("todos_users")
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        return null;
    }

    return data;
}
