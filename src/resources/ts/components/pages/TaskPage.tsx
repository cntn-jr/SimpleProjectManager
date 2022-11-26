import { Center, Spinner, useDisclosure } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useTasks } from "../../hooks/useTasks";
import { isChangedAtom } from "../../recoil/isChangedAtom";
import { isFinishedTaskAtom } from "../../recoil/isFinishedTaskAtom";
import { loadingAtom } from "../../recoil/loadingAtom";
import { Task } from "../../types/task";
import { TasksTable } from "../organisms/task/TasksTable";
import { TaskAdd } from "../organisms/task/TaskAdd";
import { TaskHeader } from "../organisms/task/TaskHeader";

export const TaskPage = memo(() => {
    const [isFinishedTask] = useRecoilState(isFinishedTaskAtom);
    const { tasks, getTasks, setTasks, firstLoading } = useTasks();
    const [isDesc, setIsDesc] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isChanged, setIsChanged] = useRecoilState(isChangedAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);

    useEffect(() => {
        getTasks(isFinishedTask);
    }, [isChanged, isFinishedTask]);

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
            {firstLoading ? (
                <Center mt="200px">
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
                        isCheckbox={!isOpen}
                        mt={isOpen ? "320px" : "50px"}
                        hTable={isOpen ? "315px" : "480px"}
                        hBody={isOpen ? "275px" : "440px"}
                        isEdit={true}
                    />
                </>
            )}
        </>
    );
});
