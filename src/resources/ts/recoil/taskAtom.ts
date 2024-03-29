import { atom } from "recoil";
import { Task } from "../types/task";

export const taskAtom = atom({
    key: "taskAtom",
    default: <Task>{
        id: 0,
        title: "",
        description: "",
        priority: "middle",
        due: "",
        is_finished: 0,
        user_id: 0,
        created_at: null,
        updated_at: null,
    },
});
