import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getTodoList, createTodoList, getShareTodoList } from "../../services/apiTodoList.js";

export function useFetchTodoList(id) {
  // This hook can be used to fetch Todo List data
  const {isPending: isLoading, data: todo_list, error} = useQuery({
    queryKey: ['todos_list', id],
    // queryFn: () => getTodoList(id),
    queryFn: () => getShareTodoList(id),
    onSuccess: (data) => {
//      console.log(data);
    },
    onError: (error) => {
      console.error("Error fetching Todo List:", error);
    },
  });

  return {isLoading, todo_list, error};
}

export function useCreateTodoList() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newList) => {
            return createTodoList(newList);
        },
        onSuccess: () => {
            toast.success("Todo List created successfully");
            queryClient.invalidateQueries({ queryKey: ['todos_list'] });
        },
        onError: (error) => {
            console.error("Error creating Todo List:", error);
            toast.error("Failed to create Todo List");
        },
    });

    return {
        createTodoList: mutation.mutate,
        isCreating: mutation.isPending,
    };
}
