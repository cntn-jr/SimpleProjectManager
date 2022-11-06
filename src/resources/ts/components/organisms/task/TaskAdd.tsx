import { Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { iconManager } from "../../../icon";
import { newTaskAtom } from "../../../recoil/newTaskAtom";
import { CancelButton } from "../../atomic/buttons/CancelButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { TaskForm } from "../../molecules/TaskForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TaskAdd = memo((props: Props) => {
    const { isOpen, onClose } = props;
    const [newTask, setNewTask] = useRecoilState(newTaskAtom);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const today = moment();
    const toast = useToast();
    useEffect(() => {
        setNewTask(["", today.format("YYYY-MM-DD").toString(), "middle", ""]);
    }, []);
    const createTask = () => {
        setIsLoading(true);
        axios
            .post("/api/task/store", {
                title: newTask[0],
                due: newTask[1],
                priority: newTask[2],
                description: newTask[3],
            })
            .then((res) => {
                toast({
                    title: "Task created.",
                    description: "We've created your task: for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right"
                });
                onClose();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const workTask = [...newTask];
        workTask[0] = e.target.value;
        setNewTask((newTask) => {
            return workTask;
        });
    };
    const onChangeDue = (e: ChangeEvent<HTMLInputElement>) => {
        const workTask = [...newTask];
        workTask[1] = e.target.value;
        setNewTask((newTask) => {
            return workTask;
        });
    };
    const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
        const workTask = [...newTask];
        workTask[2] = e.target.value;
        setNewTask((newTask) => {
            return workTask;
        });
    };
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const workTask = [...newTask];
        workTask[3] = e.target.value;
        setNewTask((newTask) => {
            return workTask;
        });
    };
    return (
        <>
            {isOpen ? (
                <Stack
                    w={{
                        sm: "330px",
                        md: "610px",
                        lg: "800px",
                        xl: "1000px",
                        "2xl": "1200px",
                    }}
                    h="280px"
                    mt="40px"
                    p="20px"
                    bgColor="main.2.100"
                    position="fixed"
                    borderBottom="1px solid"
                    borderColor="font.100"
                    justifyContent="space-around"
                >
                    <TaskForm
                        onChangeTitle={onChangeTitle}
                        onChangeDue={onChangeDue}
                        onChangePriority={onChangePriority}
                        onChangeDescription={onChangeDescription}
                        isLoading={isLoading}
                    />
                    <Stack direction="row">
                        <PrimaryButton
                            leftIcon={iconManager.check}
                            size="md"
                            onClick={createTask}
                            isLoading={isLoading}
                            isDisabled={
                                newTask[0] == "" ||
                                newTask[1] == "" ||
                                newTask[2] == ""
                            }
                        >
                            OK
                        </PrimaryButton>
                        <CancelButton
                            onClick={onClose}
                            isDisabled={isLoading}
                        />
                    </Stack>
                </Stack>
            ) : (
                <></>
            )}
        </>
    );
});
