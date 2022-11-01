import axios from "axios";
import { useCallback, useState } from "react";
import { Task } from "../types/task";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [firstLoading, setFirstLoading] = useState<boolean>(false);

    const getTasks = useCallback(() => {
        setFirstLoading(true);
        axios.get<Array<Task>>("/api/task").then((res) => {
            setTasks(res.data);
        }).finally( () => {
            setFirstLoading(false);
        } );
    }, []);

    return { getTasks, tasks, setTasks, firstLoading };
};
