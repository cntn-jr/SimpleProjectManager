import { atom } from "recoil";

export const loginUserAtom = atom({
    key: "loginUserAtom",
    default: {
        email: "",
        password: "",
    },
});
