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
import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";
import { useTasks } from "../../../hooks/useTasks";
import { iconManager } from "../../../icon";
import { editTaskAtom } from "../../../recoil/editTaskAtom";
import { CancelButton } from "../../atomic/buttons/CancelButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { TaskForm } from "../../molecules/TaskForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const TaskEditModal = memo((props: Props) => {
    const { isOpen, onClose } = props;
    const [editTask, setEditTask] = useRecoilState(editTaskAtom);
    const { updateTask, loading } = useTasks();

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTask((oldEditTask) => {
            return { ...oldEditTask, title: e.target.value };
        });
    };
    const onChangeDue = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTask((oldEditTask) => {
            return { ...oldEditTask, due: e.target.value };
        });
    };
    const onChangePriority = (e: ChangeEvent<HTMLSelectElement>) => {
        setEditTask((oldEditTask) => {
            return { ...oldEditTask, priority: e.target.value };
        });
    };
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditTask((oldEditTask) => {
            return { ...oldEditTask, description: e.target.value };
        });
    };
    const onChangeIsFinished = (e: ChangeEvent<HTMLInputElement>) => {
        if (editTask.is_finished == 0) {
            setEditTask((oldEditTask) => {
                return { ...oldEditTask, is_finished: 1 };
            });
        } else {
            setEditTask((oldEditTask) => {
                return { ...oldEditTask, is_finished: 0 };
            });
        }
    };

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
                            onChangeTitle={onChangeTitle}
                            onChangeDue={onChangeDue}
                            onChangePriority={onChangePriority}
                            onChangeDescription={onChangeDescription}
                            isLoading={loading}
                            title={editTask.title}
                            due={editTask.due}
                            priority={editTask.priority}
                            description={editTask.description}
                        />
                        <Stack h="40px" justifyContent="space-around">
                            <Checkbox
                                defaultValue={editTask.id}
                                defaultChecked={editTask.is_finished == 1}
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
                                    editTask.title == "" ||
                                    editTask.due == "" ||
                                    editTask.priority == ""
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
