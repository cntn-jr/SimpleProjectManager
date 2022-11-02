import { Center, Spinner } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../types/task";
import { TasksTable } from "../atomic/TasksTable";
import { TaskHeader } from "../organisms/task/TaskHeader";

export const TaskPage = memo(() => {
    const { tasks, getTasks, setTasks, firstLoading } = useTasks();
    const [isDesc, setIsDesc] = useState<boolean>(false);
    const [orderLoading, setOrderLoading] = useState<boolean>(false);

    useEffect(() => {
        getTasks();
    }, []);

    const reverseTasks = () => {
        setOrderLoading(true);
        let isDescClone;
        isDescClone = isDesc;
        setIsDesc(!isDescClone);
        setTasks([...tasks].reverse());
        setOrderLoading(false);
    };

    const sortTitle = () => {
        setOrderLoading(true);
        let newTask = [...tasks].sort((a, b) => {
            if (a.title < b.title) return 1;
            return -1;
        });
        if (isDesc) setTasks(newTask);
        else setTasks(newTask.reverse());
        setOrderLoading(false);
    };
    const sortDue = () => {
        setOrderLoading(true);
        let newTask = [...tasks].sort((a, b) => {
            if (a.due < b.due) return 1;
            return -1;
        });
        if (isDesc) setTasks(newTask);
        else setTasks(newTask.reverse());
        setOrderLoading(false);
    };
    const sortPriority = () => {
        setOrderLoading(true);
        const highTask: Array<Task> = [];
        const middleTask: Array<Task> = [];
        const lowTask: Array<Task> = [];
        tasks.map((task) => {
            if (task.priority == "high") highTask.push(task);
            else if (task.priority == "middle") middleTask.push(task);
            else lowTask.push(task);
        });
        if (isDesc) setTasks([...highTask, ...middleTask, ...lowTask]);
        else setTasks([...lowTask, ...middleTask, ...highTask]);
        setOrderLoading(false);
    };

    return (
        <>
            {orderLoading || firstLoading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <>
                    <TaskHeader
                        onClickRadio={reverseTasks}
                        sortDue={sortDue}
                        sortTitle={sortTitle}
                        sortPriority={sortPriority}
                    />
                    <TasksTable tasks={tasks} isCheckbox={true} mt="50px" />
                </>
            )}
        </>
    );
});
