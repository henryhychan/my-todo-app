//import { useMutation } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getTodoShareApi,
  deleteTodoShareApi,
  addTodoShareApi,
  updateTodoShareApi,
} from "../../services/apiTodoShare.js";
import { getUserByEmail } from "../../services/apiUsers.js";
import { useUser } from "../authentication/useUser.js";
import {useFormMutation} from "../../hooks/FormMutationHandler.js";

export function useFetchTodoShare(list_id) {
  // This hook can be used to fetch Todo Share data
  const {
    isPending: isLoading,
    data: todo_share,
    error,
  } = useQuery({
    queryKey: ["todos_share", list_id],
    // queryFn: () => getTodoList(id),
    queryFn: () => getTodoShareApi(list_id),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error fetching Todo Share:", error);
    },
  });

  return { isLoading, todo_share, error };
}

export function useAddTodoShare(list_id) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutation receives an object: { email } (caller can also pass just the email string)
    mutationFn: async (payload) => {
      const email = typeof payload === "string" ? payload : payload?.email;
      if (!email) throw new Error("Email is required to create share");

      // 1) look up user by email
      const user = await getUserByEmail(email);
      if (!user) {
        // ensure the API returns `null`/`undefined` when not found
        throw new Error(`User not found for email: ${email}`);
      }

      // 2) extract user id (adjust field name depending on your API response)
      const {user_id }= user;
      if (!user_id) throw new Error("User id not available from user lookup");

      // 3) build share payload and call addTodoShareApi
      const newShare = { list_id, share_to: user_id, share_level: 1 }; // include email if helpful
      console.log(newShare);
      return addTodoShareApi(newShare);
    },
    onSuccess: () => {
      toast.success("Share Access added successfully");
      queryClient.invalidateQueries({ queryKey: ["todos_share"] });
    },
    onError: (error) => {
      console.error("Error creating Todo Share Access:", error);
      toast.error("Failed to create Todo Share Access");
    },
  });

  return {
    createTodoShare: mutation.mutate,
    isCreating: mutation.isPending,
  };
}
// Edit todo item hook using Hook Factory
export function useUpdateTodoShare() {
    const {mutate: updateTodoShare, isPending: isUpdating} = useFormMutation({
        mutationFn: (todoShare) => updateTodoShareApi(todoShare),
        queryKey: ['todos_share'],
        successMessage: "Share Access updated successfully!",
        errorMessage: "Failed to update Todo Share Access",
    });

    return {updateTodoShare, isUpdating};
}


// Delete todo item hook using Hook Factory
export function useDeleteTodoShare() {
  const { mutate: deleteTodoShare, isPending: isDeleting } = useFormMutation({
    mutationFn: deleteTodoShareApi,
    queryKey: ["todos_share"],
    successMessage: "Share access deleted successfully!",
    errorMessage: "Failed to delete sharing access",
  });

  return { deleteTodoShare, isDeleting };
}
