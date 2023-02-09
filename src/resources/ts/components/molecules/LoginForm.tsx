import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Stack,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { PrimaryButton } from "../atomic/buttons/PrimaryButton";

export const LoginForm = memo(() => {
    const { login, loading, isError } = useAuthentication();
    const history = useHistory();
    const [loginUser, setLoginUser] = useState<{
        email: string;
        password: string;
    }>({ email: "", password: "" });
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginUser((oldLoginUser) => {
            return { ...oldLoginUser, email: e.target.value };
        });
    };
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginUser((oldLoginUser) => {
            return { ...oldLoginUser, password: e.target.value };
        });
    };
    const onClickLogin = () => {
        login(loginUser);
    };
    const onClickSignupLink = () => {
        history.push("/signup");
    };
    return (
        <Stack spacing="20px">
            <FormControl isInvalid={isError}>
                {isError ? (
                    <FormErrorMessage>
                        Email address or password is incorrect.
                    </FormErrorMessage>
                ) : null}
            </FormControl>
            <Input
                placeholder="Email"
                type="email"
                border="none"
                bgColor="main.1"
                onChange={onChangeEmail}
                isDisabled={loading}
                isInvalid={isError}
                isRequired
            />
            <Input
                placeholder="Password"
                border="none"
                bgColor="main.1"
                type="password"
                onChange={onChangePassword}
                isDisabled={loading}
                isInvalid={isError}
                isRequired
            />
            <Stack direction="row" spacing="50px">
                <PrimaryButton
                    size="md"
                    onClick={onClickLogin}
                    isLoading={loading}
                    isDisabled={
                        loginUser.email == "" ||
                        loginUser.password.length < 8 ||
                        loginUser.password.length > 31
                    }
                    leftIcon={null}
                >
                    Log in
                </PrimaryButton>
                <Button
                    variant="link"
                    color="font.50"
                    isDisabled={loading}
                    onClick={onClickSignupLink}
                >
                    sign up
                </Button>
            </Stack>
        </Stack>
    );
});
