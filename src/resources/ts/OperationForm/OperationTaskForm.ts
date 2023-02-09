import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { tasksAtom } from "../recoil/tasksAtom";
import { taskAtom } from "../recoil/taskAtom";

export const OperationTaskForm = () => {
    const [task, setTask] = useRecoilState(taskAtom);
    const [tasks, setTasks] = useRecoilState(tasksAtom);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTask((oldTask) => {
            return { ...oldTask, title: e.target.value };
        });
    };
    const onChangeDue = (e: ChangeEvent<HTMLInputElement>) => {
        setTask((oldTask) => {
            return { ...oldTask, due: e.target.value };
        });
    };
    const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
        setTask((oldTask) => {
            return { ...oldTask, priority: e.target.value };
        });
    };
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTask((oldTask) => {
            return { ...oldTask, description: e.target.value };
        });
    };

    const onChangeIsFinished = () => {
        if (task.is_finished == 0) {
            setTask((oldTask) => {
                return { ...oldTask, is_finished: 1 };
            });
        } else {
            setTask((oldTask) => {
                return { ...oldTask, is_finished: 0 };
            });
        }
    };

    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const task_id = e.target.value;
        const workTasks = [...tasks];
        if (
            workTasks.find((taskId) => {
                return taskId === task_id;
            })
        ) {
            setTasks((newTasks) => {
                return [...newTasks].filter((taskId) => {
                    return taskId !== task_id;
                });
            });
        } else {
            setTasks((newTasks) => {
                return [...newTasks, task_id];
            });
        }
    };

    return {
        onChangeTitle,
        onChangeDue,
        onChangePriority,
        onChangeDescription,
        onChangeCheckbox,
        onChangeIsFinished,
    };
};
