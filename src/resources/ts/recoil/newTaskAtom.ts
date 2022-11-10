import { atom } from "recoil";

export const newTaskAtom = atom({
    key: "newTaskTitleTitleAtom",
    default: {
        title: "",
        due: "",
        priority: "middle",
        description: "",
    },
});
