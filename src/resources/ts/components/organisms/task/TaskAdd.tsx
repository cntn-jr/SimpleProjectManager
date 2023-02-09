import { Stack } from "@chakra-ui/react";
import moment from "moment";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useTasks } from "../../../hooks/useTasks";
import { iconManager } from "../../../icon";
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
    const { createTask } = useTasks();
    const today = moment();
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
                            onClick={() => createTask(onClose)}
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
