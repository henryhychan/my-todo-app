import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useFormMutation(config) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutationFn,
    queryKey,
    successMessage,
    errorMessage,
    onSuccessCallback,
    navigateTo,
  } = config;

  const { mutate, isPending, error } = useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (successMessage) {
        toast.success(successMessage);
      }
      
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey });
      }
      
      if (onSuccessCallback) {
        onSuccessCallback(data, variables, context);
      }
      
      if (navigateTo) {
        navigate(navigateTo);
      }
    },
    onError: (err) => {
      toast.error(errorMessage || `Operation failed: ${err.message}`);
    },
  });

  return { mutate, isPending, error };
}
