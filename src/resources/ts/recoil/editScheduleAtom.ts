import { Task } from "gantt-task-react";
import { atom } from "recoil";

export const editScheduleAtom = atom({
    key: "editScheduleAtom",
    default: <Task>{
        start: new Date(2020, 1, 1),
        end: new Date(2020, 1, 2),
        name: "Idea",
        id: "Task 0",
        type: "task",
        progress: 100,
    },
});
