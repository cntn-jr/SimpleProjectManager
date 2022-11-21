import axios from "axios";
import { useState } from "react";

export const useLoginUser = () => {
    const [loginUser, setLoginUser] = useState({});

    const getLoginUser = () => {
        axios.get("api/user").then((res) => {
            setLoginUser(res.data);
        });
    };

    return { getLoginUser, loginUser };
};
