import {
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { signupUser } from "../../types/signupUser";
import { PrimaryButton } from "../atomic/buttons/PrimaryButton";

export const SignForm = memo(() => {
    const [user, setUser] = useState<signupUser>({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<Array<string>>([]);
    const [firstNameError, setFirstNameError] = useState<Array<string>>([]);
    const [lastNameError, setLastNameError] = useState<Array<string>>([]);
    const [passwordError, setPasswordError] = useState<Array<string>>([]);
    const history = useHistory();
    const toast = useToast();
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((oldUser) => {
            return { ...oldUser, email: e.target.value };
        });
    };
    const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((oldUser) => {
            return { ...oldUser, first_name: e.target.value };
        });
    };
    const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((oldUser) => {
            return { ...oldUser, last_name: e.target.value };
        });
    };
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setUser((oldUser) => {
            return { ...oldUser, password: e.target.value };
        });
    };
    const onClickSignup = () => {
        setLoading(true);
        axios
            .post("/api/signup", user)
            .then((res) => {
                toast({
                    title: "Sing up succeeded.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                history.push("/login");
            })
            .catch((err) => {
                setEmailError(err.response.data.errors.email);
                setFirstNameError(err.response.data.errors.first_name);
                setLastNameError(err.response.data.errors.last_name);
                setPasswordError(err.response.data.errors.password);
                toast({
                    title: "You could not sign up.",
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
    const onClickLoginLink = () => {
        history.push("/login");
    };
    return (
        <Stack spacing="20px">
            <FormControl isInvalid={emailError.length != 0}>
                <Input
                    placeholder="Email"
                    type="email"
                    border="none"
                    bgColor="main.1"
                    isDisabled={loading}
                    isRequired
                    onChange={onChangeEmail}
                />
                {emailError.length != 0 ? (
                    <FormErrorMessage>
                        {emailError.map((msg) => (
                            <>{msg}</>
                        ))}
                    </FormErrorMessage>
                ) : null}
            </FormControl>

            <Stack direction="row">
                <FormControl isInvalid={firstNameError.length != 0}>
                    <Input
                        placeholder="First Name"
                        border="none"
                        bgColor="main.1"
                        isDisabled={loading}
                        isRequired
                        onChange={onChangeFirstName}
                    />
                    {firstNameError.length != 0 ? (
                        <FormErrorMessage>
                            {firstNameError.map((msg) => (
                                <>{msg}</>
                            ))}
                        </FormErrorMessage>
                    ) : null}
                </FormControl>
                <FormControl isInvalid={lastNameError.length != 0}>
                    <Input
                        placeholder="Last Name"
                        border="none"
                        bgColor="main.1"
                        isDisabled={loading}
                        isRequired
                        onChange={onChangeLastName}
                    />
                    {emailError.length != 0 ? (
                        <FormErrorMessage>
                            {lastNameError.map((msg) => (
                                <>{msg}</>
                            ))}
                        </FormErrorMessage>
                    ) : null}
                </FormControl>
            </Stack>
            <FormControl isInvalid={passwordError.length != 0}>
                <Input
                    placeholder="Password"
                    type="password"
                    border="none"
                    bgColor="main.1"
                    isRequired
                    isDisabled={loading}
                    onChange={onChangePassword}
                />
                {passwordError.length != 0 ? (
                    <FormErrorMessage>
                        {passwordError.map((msg) => (
                            <>{msg}</>
                        ))}
                    </FormErrorMessage>
                ) : null}
                <FormHelperText>
                    Passwords should be 8 to 31 characters long, including a~z,
                    A~Z, 0~9, and one symbol (-or_) character each.
                </FormHelperText>
            </FormControl>
            <Stack direction="row" spacing="50px">
                <PrimaryButton
                    size="md"
                    onClick={onClickSignup}
                    isLoading={loading}
                    isDisabled={
                        user.email == "" ||
                        user.first_name == "" ||
                        user.last_name == "" ||
                        user.password.length < 8 ||
                        user.password.length > 31
                    }
                    leftIcon={null}
                >
                    Sign up
                </PrimaryButton>
                <Button
                    variant="link"
                    color="font.50"
                    isDisabled={loading}
                    onClick={onClickLoginLink}
                >
                    log in
                </Button>
            </Stack>
        </Stack>
    );
});
