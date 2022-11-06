import { Center, Spinner, useDisclosure } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { Task } from "../../types/task";
import { TasksTable } from "../atomic/TasksTable";
import { TaskAdd } from "../organisms/task/TaskAdd";
import { TaskHeader } from "../organisms/task/TaskHeader";

export const TaskPage = memo(() => {
    const { tasks, getTasks, setTasks, firstLoading } = useTasks();
    const [isDesc, setIsDesc] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        getTasks();
    }, []);

    const reverseTasks = () => {
        setLoading(true);
        let isDescClone;
        isDescClone = isDesc;
        setIsDesc(!isDescClone);
        setTasks([...tasks].reverse());
        setLoading(false);
    };

    const sortTitle = () => {
        setLoading(true);
        let newTask = [...tasks].sort((a, b) => {
            if (a.title < b.title) return 1;
            return -1;
        });
        if (isDesc) setTasks(newTask);
        else setTasks(newTask.reverse());
        setLoading(false);
    };
    const sortDue = () => {
        setLoading(true);
        let newTask = [...tasks].sort((a, b) => {
            if (a.due < b.due) return 1;
            return -1;
        });
        if (isDesc) setTasks(newTask);
        else setTasks(newTask.reverse());
        setLoading(false);
    };
    const sortPriority = () => {
        setLoading(true);
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
        setLoading(false);
    };

    return (
        <>
            {loading || firstLoading ? (
                <Center>
                    <Spinner />
                </Center>
            ) : (
                <>
                    <TaskHeader
                        onClickRadio={reverseTasks}
                        onClickAdd={onOpen}
                        sortDue={sortDue}
                        sortTitle={sortTitle}
                        sortPriority={sortPriority}
                        showAddBtn={!isOpen}
                    />
                    <TaskAdd isOpen={isOpen} onClose={onClose} />
                    <TasksTable
                        tasks={tasks}
                        isCheckbox={true}
                        mt={isOpen ? "320px" : "50px"}
                    />
                </>
            )}
        </>
    );
});
