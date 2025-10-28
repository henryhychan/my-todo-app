import {useState} from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";
import {toast} from "react-hot-toast";
import {useLogInOut} from "./useLogInOut.js";
import {Link} from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoggingIn} = useLogInOut();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please input email and password.");

            return;
        }
        login({email, password});
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoggingIn}>
                    {!isLoggingIn ? 'Login': <SpinnerMini/>}
                </Button>
            </FormRowVertical>
            <FormRowVertical>
                <Link to={"/signup"}>Sign Up here</Link>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
