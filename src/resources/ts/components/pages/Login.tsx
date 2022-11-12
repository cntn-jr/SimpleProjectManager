import { memo } from "react";
import { LoginForm } from "../molecules/LoginForm";
import { UserBox } from "../molecules/UserBox";

export const Login = memo(() => {
    return (
        <>
            <UserBox headerText="Log in">
                <LoginForm />
            </UserBox>
        </>
    );
});
