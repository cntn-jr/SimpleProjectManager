import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const useAuthentication = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);
    const history = useHistory();
    const toast = useToast();
    const login = (loginUser: { email: string; password: string }) => {
        setLoading(true);
        axios.get("/sanctum/csrf-cookie").then(() => {
            axios
                .post("/api/login", loginUser)
                .then(() => {
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
        axios
            .post("api/logout")
            .then(() => {
                setTimeout(() => {
                    toast({
                        title: "Logout succeeded.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setLoading(false);
                    history.replace("/login");
                }, 3 * 1000);
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
