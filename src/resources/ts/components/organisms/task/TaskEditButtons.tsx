import { Stack, useDisclosure } from "@chakra-ui/react";
import { memo } from "react";
import { useTasks } from "../../../hooks/useTasks";
import { iconManager } from "../../../icon";
import { DeleteButton } from "../../atomic/buttons/DeleteButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { DeleteModal } from "../../molecules/DeleteModal";

type Props = {
    editTasks: Array<string>;
};

export const TaskEditButtons = memo((props: Props) => {
    const { editTasks } = props;
    const { finishTask, deleteTask, loading } = useTasks();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {editTasks.length ? (
                <>
                    <Stack direction="row" mt="550px" postion="fixed">
                        <PrimaryButton
                            leftIcon={iconManager.check}
                            size="sm"
                            onClick={finishTask}
                            isLoading={loading}
                            isDisabled={false}
                        >
                            Finish
                        </PrimaryButton>
                        <DeleteButton
                            size="sm"
                            onClick={onOpen}
                            isDisabled={false}
                            isLoading={loading}
                        />
                    </Stack>
                    <DeleteModal
                        onClick={deleteTask}
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                </>
            ) : (
                <></>
            )}
        </>
    );
});
