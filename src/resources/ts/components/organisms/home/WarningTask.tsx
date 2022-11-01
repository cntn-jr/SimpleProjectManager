import { memo, useEffect } from "react";
import { useWarningTasks } from "../../../hooks/useWarningTasks";
import { ItemHeader } from "../../atomic/ItemHeader";
import { TasksTable } from "../../atomic/TasksTable";

export const WarningTask = memo(() => {
    const { getTasks, tasks } = useWarningTasks();

    useEffect(() => {
        getTasks();
        console.log(tasks);
    }, []);

    return (
        <>
            <ItemHeader text="Warning Task" borderColor="main.2.100" />
            <TasksTable tasks={tasks} isCheckbox={false} mt="50px" />
        </>
    );
});
