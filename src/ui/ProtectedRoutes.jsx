import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    // 1. Load the authenticated users
    const { isLoading, isAuthenticated} = useUser();

//    console.log(`User is authenticated ${isAuthenticated}`);
    // 2. If there is NO AUTHENTICATED user, redirect back to login
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading)
                navigate('/login');
        },
        [isAuthenticated, isLoading, navigate]
    );

    // 3. while loading, show a spinner
    if (isLoading) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }


    // 4. If there IS a user, render the app
    return isAuthenticated ? children : null;
}

export default ProtectedRoute;