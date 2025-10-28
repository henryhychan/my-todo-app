import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Dashboard from "./pages/Dashboard.jsx";
import Account from "./pages/Account.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Users from "./pages/Users.jsx";
import NewUsers from "./pages/NewUsers.jsx";
import Login from "./pages/Login.jsx";
import TodoList from "./pages/TodoList.jsx";
import TodoItems from "./pages/TodoItems.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoutes.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            // gcTime: 1000 * 60, // 1 minutes
            gcTime: 0, // Disable garbage collection for queries
        },
    },
});

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }>
                            <Route index element={<Navigate replace to="dashboard" />}></Route>
                            <Route path='dashboard' element={<Dashboard />}></Route>
                            <Route path='todo-list' element={<TodoList />}></Route>
                            <Route path='todo-list/:list_id' element={<TodoItems />}></Route>
                            <Route path='todo-items' element={<TodoItems />}></Route>
                            <Route path='users' element={<Users />}></Route>
                            {/*<Route path='settings' element={<Settings />}></Route>*/}
                        </Route>
                        <Route path='signup' element={<NewUsers />}></Route>
                        <Route path='login' element={<Login />}></Route>
                        <Route path='*' element={<PageNotFound />}></Route>
                    </Routes>
                </BrowserRouter>

                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: '1.6rem',
                            maxWidth: "500px",
                            padding: '1.2rem',
                            backgroundColor: 'var(--color-brand-100)',
                            color: 'var(--color-black-100)',
                        },
                    }} />
            </QueryClientProvider>
        </>
    )
}

export default App
