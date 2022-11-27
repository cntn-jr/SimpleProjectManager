import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { tasksAtom } from "../recoil/tasksAtom";
import { isChangedAtom } from "../recoil/isChangedAtom";
import { loadingAtom } from "../recoil/loadingAtom";
import { taskAtom } from "../recoil/taskAtom";
import { Task } from "../types/task";

export const useTasks = () => {
    const [orderTasks, setOrderTasks] = useState<Array<Task>>([]);
    const [firstLoading, setFirstLoading] = useState<boolean>(false);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [isChanged, setIsChanged] = useRecoilState(isChangedAtom);
    // モーダルで編集する１つのタスク
    const [task, setTask] = useRecoilState(taskAtom);
    // チェックボックスで操作する複数のタスク
    const [tasks, setTasks] = useRecoilState(tasksAtom);

    const toast = useToast();

    const getTasks = useCallback((isFinishedTask: boolean) => {
        setFirstLoading(true);
        if (isFinishedTask) {
            axios
                .get<Array<Task>>("/api/task/finished")
                .then((res) => {
                    setOrderTasks(
                        res.data.sort((a, b) => {
                            if (a.due > b.due) return 1;
                            return -1;
                        })
                    );
                })
                .finally(() => {
                    setFirstLoading(false);
                });
        } else {
            axios
                .get<Array<Task>>("/api/task")
                .then((res) => {
                    setOrderTasks(
                        res.data.sort((a, b) => {
                            if (a.due > b.due) return 1;
                            return -1;
                        })
                    );
                })
                .finally(() => {
                    setFirstLoading(false);
                });
        }
    }, []);

    const createTask = (onClose: () => void) => {
        setLoading(true);
        axios
            .post("/api/task/store", task)
            .then((res) => {
                toast({
                    title: "Task created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                onClose();
            })
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
                setIsChanged(!isChanged);
            });
    };

    const updateTask = () => {
        setLoading(true);
        axios
            .put("api/task/update", task)
            .then(() => {
                toast({
                    title: "Task updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((err) => {})
            .finally(() => {
                setIsChanged(!isChanged);
                setLoading(false);
            });
    };

    const finishTask = () => {
        setLoading(true);
        axios
            .put("/api/task/finish", { task_id_ary: tasks })
            .then(() => {
                toast({
                    title: "Task updated.",
                    description: "Task Finish!!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((err) => {})
            .finally(() => {
                setTasks([]);
                setLoading(false);
                setIsChanged(!isChanged);
            });
    };

    const deleteTask = () => {
        setLoading(true);
        axios
            .put("/api/task/delete", { task_id_ary: tasks })
            .then(() => {
                toast({
                    title: "Task deleted.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((err) => {})
            .finally(() => {
                setTasks([]);
                setLoading(false);
                setIsChanged(!isChanged);
            });
    };

    return {
        getTasks,
        orderTasks,
        setOrderTasks,
        createTask,
        updateTask,
        finishTask,
        deleteTask,
        firstLoading,
        loading,
    };
};
