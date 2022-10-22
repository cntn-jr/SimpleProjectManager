import axios from "axios";
import { useCallback, useState } from "react";
import { Task } from "../types/task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);

    const getTasks = useCallback(() => {
        axios.get<Array<Task>>("/api/tasks").then((res) => {
            setTasks(res.data);
        });
    }, []);

    return { getTasks, tasks };
};
