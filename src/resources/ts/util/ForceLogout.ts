import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAuthAtom } from "../recoil/isAuthAtom";

export const ForceLogout = () => {
    const history = useHistory();
    const toast = useToast();
    const [isAuth, setIsAuth] = useRecoilState(isAuthAtom);

    const forceLogout = (status: any) => {
        if (status === 401) {
            setIsAuth(false);
            history.replace("/login");
            toast({
                title: "Authentication information has expired.",
                status: "error",
                duration: 10000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    return { forceLogout };
};
