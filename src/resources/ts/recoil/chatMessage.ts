import { atom } from "recoil";
import { chatMessage } from "../types/chatMessage";

export const chatMessageAtom = atom({
    key: "chatMessageAtom",
    default: <chatMessage>{
        room_id: 0,
        user_id: 0,
        content: "",
    },
});
