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
    const { orderTasks, getTasks, setOrderTasks, firstLoading } = useTasks();
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
        setOrderTasks([...orderTasks].reverse());
        setLoading(false);
    };

    const sortTitle = () => {
        setLoading(true);
        let newTask = [...orderTasks].sort((a, b) => {
            if (a.title < b.title) return 1;
            return -1;
        });
        if (isDesc) setOrderTasks(newTask);
        else setOrderTasks(newTask.reverse());
        setLoading(false);
    };
    const sortDue = () => {
        setLoading(true);
        let newTask = [...orderTasks].sort((a, b) => {
            if (a.due < b.due) return 1;
            return -1;
        });
        if (isDesc) setOrderTasks(newTask);
        else setOrderTasks(newTask.reverse());
        setLoading(false);
    };
    const sortPriority = () => {
        setLoading(true);
        const highTask: Array<Task> = [];
        const middleTask: Array<Task> = [];
        const lowTask: Array<Task> = [];
        orderTasks.map((orderTask) => {
            if (orderTask.priority == "high") highTask.push(orderTask);
            else if (orderTask.priority == "middle") middleTask.push(orderTask);
            else lowTask.push(orderTask);
        });
        if (isDesc) setOrderTasks([...highTask, ...middleTask, ...lowTask]);
        else setOrderTasks([...lowTask, ...middleTask, ...highTask]);
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
                        tasks={orderTasks}
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
