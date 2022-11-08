import { atom } from "recoil";

export const editTasksAtom = atom({
    key: "editTasksAtom",
    default: <Array<string>>[],
});
