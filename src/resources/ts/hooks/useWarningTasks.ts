import axios from "axios";
import { useCallback, useState } from "react";
import { Task } from "../types/task";

export const useWarningTasks = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getTasks = useCallback(() => {
        setLoading(true);
        axios
            .get<Array<Task>>("/api/home")
            .then((res) => {
                setTasks(res.data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { getTasks, tasks, loading };
};
