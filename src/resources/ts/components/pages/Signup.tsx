import { memo } from "react";
import { SignForm } from "../molecules/SignForm";
import { UserBox } from "../molecules/UserBox";

export const Signup = memo(() => {
    return (
        <UserBox headerText="Sign up">
            <SignForm />
        </UserBox>
    );
});
