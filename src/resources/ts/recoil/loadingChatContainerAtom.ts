import { atom } from "recoil";

export const loadingChatContainerAtom = atom({
    key: "loadingChatContainerAtom",
    default: <boolean>false,
});
