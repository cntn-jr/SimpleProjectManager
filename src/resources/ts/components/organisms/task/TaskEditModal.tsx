import {
    Checkbox,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { useTasks } from "../../../hooks/useTasks";
import { iconManager } from "../../../icon";
import { OperationTaskForm } from "../../../OperationForm/OperationTaskForm";
import { taskAtom } from "../../../recoil/taskAtom";
import { CancelButton } from "../../atomic/buttons/CancelButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { TaskForm } from "../../molecules/TaskForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TaskEditModal = memo((props: Props) => {
    const { isOpen, onClose } = props;
    const [task, setTask] = useRecoilState(taskAtom);
    const { updateTask, loading } = useTasks();
    const { onChangeIsFinished } = OperationTaskForm();

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent
                    bgColor="main.2.100"
                    h="400px"
                    justifyContent="space-around"
                >
                    <ModalHeader color="font.100">Task Edit</ModalHeader>
                    <ModalBody justifyContent="space-around">
                        <TaskForm
                            isLoading={loading}
                            title={task.title}
                            due={task.due}
                            priority={task.priority}
                            description={task.description}
                        />
                        <Stack h="40px" justifyContent="space-around">
                            <Checkbox
                                defaultValue={task.id}
                                defaultChecked={task.is_finished == 1}
                                as="b"
                                onChange={onChangeIsFinished}
                                isDisabled={loading}
                            >
                                Finished
                            </Checkbox>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Stack direction="row">
                            <PrimaryButton
                                onClick={updateTask}
                                size="sm"
                                isDisabled={
                                    task.title == "" ||
                                    task.due == "" ||
                                    task.priority == ""
                                }
                                isLoading={loading}
                                leftIcon={iconManager.update}
                            >
                                Update
                            </PrimaryButton>
                            <CancelButton
                                onClick={onClose}
                                size="sm"
                                isDisabled={loading}
                            />
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
