import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useParams, useSearchParams} from "react-router-dom";
import {useFormMutation} from "../../hooks/FormMutationHandler";
import {
    getTodoItemsByList,
    getTodoItem,
    createEditTodoItem,
    deleteTodoItem as deleteTodoItemApi,
    getTodoItemsTags,
    getTodoShareItemsByList
} from "../../services/apiTodoItems.js";
import { useUser } from "../authentication/useUser.js";

import {toast} from "react-hot-toast";

export function useFetchTodoItems() {
    const { list_id } = useParams();

    // This hook can be used to fetch Todo List data
    const {isPending: isLoading, data: todos_items, error} = useQuery({
        queryKey: ['todos_items', list_id],
        queryFn: () => getTodoItemsByList(list_id),
        onSuccess: (data) => {
//            console.log(data);
        },
        onError: (error) => {
            console.error("Error fetching Todo Items:", error);
        },
    });

    return {isLoading, todos_items, error};
}

export function useFetchTodoShareItems() {

    const { list_id } = useParams();
    const { user } = useUser();
    // const [searchParams] = useSearchParams();
    // const id = searchParams.get("todoList");
    // const id = params.get("list_id");

    console.log(`Fetch TodoList ID ${list_id} by User ID: ${user?.user.id}`);

    // This hook can be used to fetch Todo List data
    const {isPending: isLoading, data: todos_items, error} = useQuery({
        queryKey: ['todos_items', list_id, user?.user.id],
        queryFn: () => getTodoShareItemsByList(list_id, user?.user.id),
        // enabled: !!list_id && !!user?.user?.id,
        onSuccess: (data) => {
//            console.log(data);
        },
        onError: (error) => {
            console.error("Error fetching Todo Items:", error);
        },
    });

    return {isLoading, todos_items, error};
}


// Fetch single todo item
export function useFetchTodoItem(itemId) {
    const {isPending: isLoading, data: todoItem, error} = useQuery({
        queryKey: ['todos_items', itemId],
        queryFn: () => getTodoItem(itemId),
        enabled: !!itemId,
    });

    return {isLoading, todoItem, error};
}


// Fetch single todo item
export function useFetchTodoItemTags() {
    const {isPending: isLoading, data: tags, error} = useQuery({
        queryKey: ['todos_items', 'tags'],
        queryFn: () => getTodoItemsTags(),
    });

    return {isLoading, tags, error};
}

// Create todo item hook using Hook Factory
export function useCreateTodoItem() {
    const {mutate: createTodoItem, isPending: isCreating} = useFormMutation({
        mutationFn: (newTodoItem) => createEditTodoItem(newTodoItem, null),
        queryKey: ['todos_items'],
        successMessage: "Todo item created successfully!",
        errorMessage: "Failed to create todo item",
    });

    return {createTodoItem, isCreating};
}

// Edit todo item hook using Hook Factory
export function useEditTodoItem() {
    const {mutate: editTodoItem, isPending: isEditing} = useFormMutation({
        mutationFn: ({newTodoItem, id}) => createEditTodoItem(newTodoItem, id),
        queryKey: ['todos_items'],
        successMessage: "Todo item updated successfully!",
        errorMessage: "Failed to update todo item",
    });

    return {editTodoItem, isEditing};
}

// Delete todo item hook using Hook Factory
export function useDeleteTodoItem() {
    const {mutate: deleteTodoItem, isPending: isDeleting} = useFormMutation({
        mutationFn: deleteTodoItemApi,
        queryKey: ['todos_items'],
        successMessage: "Todo item deleted successfully!",
        errorMessage: "Failed to delete todo item",
    });

    return {deleteTodoItem, isDeleting};
}