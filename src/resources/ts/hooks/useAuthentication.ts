import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthAtom } from "../recoil/isAuthAtom";

type promiseType = (data: boolean) => void;

export const useAuthentication = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useRecoilState(isAuthAtom);
    const history = useHistory();
    const toast = useToast();
    const login = (loginUser: { email: string; password: string }) => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/login", loginUser)
                .then(() => {
                    setIsAuth(true);
                    toast({
                        title: "Login succeeded.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setLoading(false);
                    history.replace("/home");
                })
                .catch(() => {
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

    const logout = () => {
        setLoading(true);
        axios
            .post("api/logout")
            .then(() => {
                setIsAuth(false);
                toast({
                    title: "Logout succeeded.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                setLoading(false);
                history.replace("/login");
            })
            .catch(() => {
                setIsError(true);
                toast({
                    title: "You could not log out.",
                    status: "error",
                    isClosable: false,
                    position: "top-right",
                });
                setLoading(false);
            });
    };

    return { login, logout, loading, isError };
};
