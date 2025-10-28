import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, signup as signupApi } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useUser() {
    const { isLoading, data: user} = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    });

    return {isLoading, user, isAuthenticated: user?.user?.role === "authenticated"};
}

export function useSignUp() {
    // const queryClient = useQueryClient();
    // const navigate = useNavigate();

    const {mutate: signup, isPending: isSigningUp} = useMutation({
        mutationFn: signupApi,

        onSuccess: (data) => {
            // queryClient.setQueriesData(['user'], user); // incorrect, invalid user object
            // queryClient.setQueryData(['user'], user.user);
//            console.log(data);
            toast.success('User Sign Up success. Please verify the new user email.')
            // navigate("/dashboard", {replace: true});
        },
        onError: (err) => {
            toast.error(`Login failed. (${err.message})`);
        }
    });
    return {signup, isSigningUp};

}