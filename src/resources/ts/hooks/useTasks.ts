import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { editTaskAtom } from "../recoil/editTaskAtom";
import { editTasksAtom } from "../recoil/editTasksAtom";
import { isChangedAtom } from "../recoil/isChangedAtom";
import { loadingAtom } from "../recoil/loadingAtom";
import { Task } from "../types/task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [firstLoading, setFirstLoading] = useState<boolean>(false);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [isChanged, setIsChanged] = useRecoilState(isChangedAtom);
    // モーダルで編集する１つのタスク
    const [editTask, setEditTask] = useRecoilState(editTaskAtom);
    // チェックボックスで操作する複数のタスク
    const [editTasks, setEditTasks] = useRecoilState(editTasksAtom);

    const toast = useToast();

    const getTasks = useCallback((isFinishedTask: boolean) => {
        setFirstLoading(true);
        if (isFinishedTask) {
            axios
                .get<Array<Task>>("/api/task/finished")
                .then((res) => {
                    setTasks(
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
                    setTasks(
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

    const updateTask = () => {
        setLoading(true);
        axios
            .put("api/task/update", editTask)
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
            .put("/api/task/finish", { task_id_ary: editTasks })
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
                setEditTasks([]);
                setLoading(false);
                setIsChanged(!isChanged);
            });
    };

    const deleteTask = () => {
        setLoading(true);
        axios
            .put("/api/task/delete", { task_id_ary: editTasks })
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
                setEditTasks([]);
                setLoading(false);
                setIsChanged(!isChanged);
            });
    };

    return {
        getTasks,
        tasks,
        setTasks,
        updateTask,
        finishTask,
        deleteTask,
        firstLoading,
        loading,
    };
};
