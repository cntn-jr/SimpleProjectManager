import { Stack, useDisclosure } from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { useTasks } from "../../../hooks/useTasks";
import { iconManager } from "../../../icon";
import { tasksAtom } from "../../../recoil/tasksAtom";
import { DeleteButton } from "../../atomic/buttons/DeleteButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { DeleteModal } from "../../molecules/DeleteModal";

export const TaskEditButtons = memo(() => {
    const [tasks] = useRecoilState(tasksAtom);
    const { finishTask, deleteTask, loading } = useTasks();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {tasks.length ? (
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
