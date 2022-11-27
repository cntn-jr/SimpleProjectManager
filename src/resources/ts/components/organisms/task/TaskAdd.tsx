import { Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { iconManager } from "../../../icon";
import { OperationTaskForm } from "../../../OperationForm/OperationTaskForm";
import { isChangedAtom } from "../../../recoil/isChangedAtom";
import { loadingAtom } from "../../../recoil/loadingAtom";
import { taskAtom } from "../../../recoil/taskAtom";
import { CancelButton } from "../../atomic/buttons/CancelButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { TaskForm } from "../../molecules/TaskForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TaskAdd = memo((props: Props) => {
    const { isOpen, onClose } = props;
    const [task, setTask] = useRecoilState(taskAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [isChanged, setIsChanged] = useRecoilState(isChangedAtom);
    const {
        onChangeTitle,
        onChangeDue,
        onChangePriority,
        onChangeDescription,
    } = OperationTaskForm();
    const today = moment();
    const toast = useToast();
    useEffect(() => {
        setTask((oldTask) => {
            return {
                ...oldTask,
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
            .post("/api/task/store", task)
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
            .catch((err) => {})
            .finally(() => {
                setLoading(false);
                setIsChanged(!isChanged);
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
                    <TaskForm isLoading={loading} />
                    <Stack direction="row">
                        <PrimaryButton
                            leftIcon={iconManager.check}
                            size="md"
                            onClick={createTask}
                            isLoading={loading}
                            isDisabled={
                                task.title == "" ||
                                task.due == "" ||
                                task.due == ""
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
