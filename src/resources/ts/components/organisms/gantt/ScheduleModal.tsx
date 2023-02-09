import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { Task } from "gantt-task-react";
import { ScheduleCreateForm } from "./ScheduleCreateForm";
import { ScheduleEditForm } from "./ScheduleEditForm";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    isUpdate: boolean;
    schedule: Task;
};

export const ScheduleModal = (props: Props) => {
    const { isOpen, onClose, isUpdate, schedule } = props;
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                <ModalOverlay />
                <ModalContent
                    bgColor="main.2.100"
                    h="280px"
                    display="flex"
                    justifyContent="space-around"
                >
                    {isUpdate ? (
                        <ScheduleEditForm
                            schedule={schedule}
                            onClose={onClose}
                        />
                    ) : (
                        <ScheduleCreateForm onClose={onClose} />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
