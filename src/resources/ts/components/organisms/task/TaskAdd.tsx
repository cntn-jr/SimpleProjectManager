import { Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { iconManager } from "../../../icon";
import { isChangedTaskAtom } from "../../../recoil/isChangedTaskAtom";
import { loadingAtom } from "../../../recoil/loadingAtom";
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
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [isChangedTask, setIsChangedTask] = useRecoilState(isChangedTaskAtom);
    const today = moment();
    const toast = useToast();
    useEffect(() => {
        setNewTask((oldNewTask) => {
            return {
                ...oldNewTask,
                title: "",
                due: today.format("YYYY-MM-DD").toString(),
                priority: "middle",
                description: "",
            };
        });
    }, []);
    const createTask = () => {
        setLoading(true);
        axios
            .post("/api/task/store", newTask)
            .then((res) => {
                toast({
                    title: "Task created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                onClose();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
                setIsChangedTask(!isChangedTask);
            });
    };
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask((oldNewTask) => {
            return {
                ...oldNewTask,
                title: e.target.value,
            };
        });
    };
    const onChangeDue = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask((oldNewTask) => {
            return {
                ...oldNewTask,
                due: e.target.value,
            };
        });
    };
    const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
        setNewTask((oldNewTask) => {
            return {
                ...oldNewTask,
                priority: e.target.value,
            };
        });
    };
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTask((oldNewTask) => {
            return {
                ...oldNewTask,
                description: e.target.value,
            };
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
                        isLoading={loading}
                    />
                    <Stack direction="row">
                        <PrimaryButton
                            leftIcon={iconManager.check}
                            size="md"
                            onClick={createTask}
                            isLoading={loading}
                            isDisabled={
                                newTask.title == "" ||
                                newTask.due == "" ||
                                newTask.due == ""
                            }
                        >
                            OK
                        </PrimaryButton>
                        <CancelButton onClick={onClose} isDisabled={loading} />
                    </Stack>
                </Stack>
            ) : (
                <></>
            )}
        </>
    );
});
