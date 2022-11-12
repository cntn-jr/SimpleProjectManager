import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginUserAtom } from "../../recoil/loginUserAtom";
import { PrimaryButton } from "../atomic/buttons/PrimaryButton";

export const LoginForm = memo(() => {
    const history = useHistory();
    const [loginUser, setLoginUser] = useRecoilState(loginUserAtom);
    const [loading, setLoading] = useState<boolean>(false);
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
    const onClickLogin = () => {
        setLoading(true);
        axios
            .put("/api/login", loginUser)
            .then((res) => {
                toast({
                    title: "Login succeeded.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                history.push("/home");
            })
            .catch((err) => {
                toast({
                    title: "You could not log in.",
                    status: "error",
                    duration: 10000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <Stack spacing="20px">
            <Input
                placeholder="Email"
                border="none"
                bgColor="main.1"
                onChange={onChangeEmail}
                isDisabled={loading}
            />
            <Input
                placeholder="Password"
                border="none"
                bgColor="main.1"
                type="password"
                onChange={onChangePassword}
                isDisabled={loading}
            />
            <Stack direction="row" spacing="50px">
                <PrimaryButton
                    size="md"
                    onClick={onClickLogin}
                    isLoading={loading}
                    isDisabled={false}
                    leftIcon={null}
                >
                    Log in
                </PrimaryButton>
                <Button variant="link" color="font.50" isDisabled={loading}>
                    sign up
                </Button>
            </Stack>
        </Stack>
    );
});
