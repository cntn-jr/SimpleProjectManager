import { atom } from "recoil";

export const newTaskAtom = atom({
    key: "newTaskAtom",
    default: {
        title: "",
        due: "",
        priority: "middle",
        description: "",
    },
});
