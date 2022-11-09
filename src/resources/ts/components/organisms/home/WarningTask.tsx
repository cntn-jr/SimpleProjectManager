import { Center, Spinner } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useWarningTasks } from "../../../hooks/useWarningTasks";
import { ItemHeader } from "../../atomic/ItemHeader";
import { TasksTable } from "../../atomic/TasksTable";

export const WarningTask = memo(() => {
    const { getTasks, tasks, loading } = useWarningTasks();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <ItemHeader text="Warning Task" borderColor="main.2.100" />
            {loading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <TasksTable
                    tasks={tasks}
                    isCheckbox={false}
                    mt="50px"
                    hTable="200px"
                    hBody="160px"
                />
            )}
        </>
    );
});
