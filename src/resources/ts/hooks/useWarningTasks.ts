import axios from "axios";
import { useCallback, useState } from "react";
import { Task } from "../types/task";

export const useWarningTasks = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);

    const getTasks = useCallback(() => {
        axios.get<Array<Task>>("/api/home").then((res) => {
            setTasks(res.data);
        });
    }, []);

    return { getTasks, tasks };
};
