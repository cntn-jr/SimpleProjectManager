import { Center, Spinner } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../types/task";
import { TasksTable } from "../atomic/TasksTable";
import { TaskHeader } from "../organisms/task/TaskHeader";

export const TaskPage = memo(() => {
    const { tasks, getTasks, setTasks, firstLoading } = useTasks();
    const [isDesc, setIsDesc] = useState<boolean>(true);
    const [orderLoading, setOrderLoading] = useState<boolean>(false);
    useEffect(() => {
        getTasks();
    }, []);
    const reverseTasks = () => {
        setOrderLoading(true);
        setIsDesc(!isDesc);
        setTasks([...tasks].reverse());
        setOrderLoading(false);
    };
    return (
        <>
            {(orderLoading || firstLoading) ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <>
                    <TaskHeader onClickRadio={reverseTasks} />
                    <TasksTable tasks={tasks} isCheckbox={true} mt="50px" />
                </>
            )}
        </>
    );
});
