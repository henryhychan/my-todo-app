import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, logout as logoutApi} from "../../services/apiAuth.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogInOut() {
    const navigate = useNavigate();

    const {mutate: login, isPending: isLoggingIn} = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),

        onSuccess: (user) => {
//            console.log(user);
            navigate("/dashboard");
        },
        onError: (err) => {
            toast.error(`Login failed. (${err.message})`);
        }
    });
    return {login, isLoggingIn};
}

export function useLogOut() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const {mutate: logout, isPending: isLoggingOut} = useMutation({
        mutationFn: logoutApi,

        onSuccess: () => {
            queryClient.removeQueries();
            // console.log(user);
            navigate("/login", {replace: true});
        },
        onError: (err) => {
            toast.error(`Logout failed. (${err.message})`);
        }
    });
    return {logout, isLoggingOut};
}