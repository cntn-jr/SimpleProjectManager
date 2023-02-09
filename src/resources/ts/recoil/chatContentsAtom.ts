import { atom } from "recoil";
import { chatContent } from "../types/chatContent";

export const chatContentsAtom = atom({
    key: "chatContentsAtom",
    default: <Array<chatContent>>[
        {
            content_id: 0,
            room_id: 0,
            content: "",
            first_name: "first",
            last_name: "last",
            content_created_at: "2022-01-01 00:00:00",
        },
    ],
});
