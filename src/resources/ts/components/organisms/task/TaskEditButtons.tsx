import { Stack, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { iconManager } from "../../../icon";
import { isChangedTaskAtom } from "../../../recoil/isChangedTaskAtom";
import { loadingAtom } from "../../../recoil/loadingAtom";
import { DeleteButton } from "../../atomic/buttons/DeleteButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { DeleteModal } from "../../molecules/DeleteModal";

type Props = {
    editTasks: Array<string>;
    setEditTasks: (ary: Array<string>) => void;
};

export const TaskEditButtons = memo((props: Props) => {
    const { editTasks, setEditTasks } = props;
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const [isChangedTask, setIsChangedTask] = useRecoilState(isChangedTaskAtom);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onClickFinish = () => {
        setLoading(true);
        axios
            .put("/api/task/finish", { task_id_ary: editTasks })
            .then(() => {
                toast({
                    title: "Task updated.",
                    description: "Task Finish!!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setEditTasks([]);
                setLoading(false);
                setIsChangedTask(!isChangedTask);
            });
    };
    const onClickDelete = () => {
        setLoading(true);
        axios
            .put("/api/task/delete", { task_id_ary: editTasks })
            .then(() => {
                toast({
                    title: "Task deleted.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setEditTasks([]);
                setLoading(false);
                setIsChangedTask(!isChangedTask);
            });
    };
    return (
        <>
            {editTasks.length ? (
                <>
                    <Stack direction="row" mt="550px" postion="fixed">
                        <PrimaryButton
                            leftIcon={iconManager.check}
                            size="sm"
                            onClick={onClickFinish}
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
                        onClick={onClickDelete}
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
