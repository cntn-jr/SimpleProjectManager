import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "../atomic/buttons/PrimaryButton";

export const LoginForm = memo(() => {
    const history = useHistory();
    const [loginUser, setLoginUser] = useState<{
        email: string;
        password: string;
    }>({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const toast = useToast();
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
    const onClickLogin = async () => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/login", loginUser)
                .then((res) => {
                    setTimeout(() => {
                        toast({
                            title: "Login succeeded.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: "top-right",
                        });
                        setLoading(false);
                        history.replace("/");
                    }, 3 * 1000);
                })
                .catch((err) => {
                    setIsError(true);
                    toast({
                        title: "You could not log in.",
                        status: "error",
                        isClosable: false,
                        position: "top-right",
                    });
                    setLoading(false);
                });
        });
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
