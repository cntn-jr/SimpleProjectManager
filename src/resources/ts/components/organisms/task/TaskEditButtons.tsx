import { Stack, useDisclosure } from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { useTasks } from "../../../hooks/useTasks";
import { iconManager } from "../../../icon";
import { tasksAtom } from "../../../recoil/tasksAtom";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { DeleteContents } from "../../molecules/DeleteContents";

export const TaskEditButtons = memo(() => {
    const [tasks] = useRecoilState(tasksAtom);
    const { finishTask, deleteTask, loading } = useTasks();
    return (
        <>
            {tasks.length ? (
                <>
                    <Stack direction="row" mt="550px" position="fixed">
                        <PrimaryButton
                            leftIcon={iconManager.check}
                            size="sm"
                            onClick={finishTask}
                            isLoading={loading}
                            isDisabled={false}
                        >
                            Finish
                        </PrimaryButton>
                        <DeleteContents
                            loading={loading}
                            onClickDelete={deleteTask}
                        />
                    </Stack>
                </>
            ) : (
                <></>
            )}
        </>
    );
});
