import { VStack } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useTasks } from "../../../hooks/useTasks";
import { ItemHeader } from "../../atomic/ItemHeader";
import { TasksTable } from "../../atomic/TasksTable";

export const WarningTask = memo(() => {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <VStack w="100%">
            <ItemHeader text="Warning Task" borderColor="main.2.100" />
            <TasksTable tasks={tasks} />
        </VStack>
    );
});
