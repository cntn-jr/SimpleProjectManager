import {
    Input,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Stack,
} from "@chakra-ui/react";
import { Task } from "gantt-task-react";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { useSchedule } from "../../../hooks/useSchedule";
import { iconManager } from "../../../icon";
import { scheduleAtom } from "../../../recoil/scheduleAtom";
import { CancelButton } from "../../atomic/buttons/CancelButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";

type Props = {
    schedule: Task;
    onClose: () => void;
};

export const ScheduleEditForm = (props: Props) => {
    const { schedule, onClose } = props;
    const { updateSchedule, loading } = useSchedule();
    const [editSchedule, setEditSchedule] = useRecoilState(scheduleAtom);
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setEditSchedule({ ...editSchedule, name: e.target.value });
    };
    const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
        setEditSchedule({ ...editSchedule, start: new Date(e.target.value) });
    };
    const onChangeEnd = (e: ChangeEvent<HTMLInputElement>) => {
        setEditSchedule({ ...editSchedule, end: new Date(e.target.value) });
    };
    const onClickUpdate = () => {
        updateSchedule();
    };
    return (
        <>
            <ModalHeader color="font.100" h="80px">
                Schedule Edit
            </ModalHeader>
            <ModalBody justifyContent="space-around" h="120px">
                <Stack direction="row" h="40px" my="20px" justifyContent="space-around">
                    <Input
                        isDisabled={loading}
                        defaultValue={schedule.name}
                        onChange={onChangeTitle}
                    />
                </Stack>
                <Stack direction="row" h="40px" justifyContent="space-around">
                    <Input
                        type="date"
                        isDisabled={loading}
                        defaultValue={
                            schedule.start.toISOString().split("T")[0]
                        }
                        onChange={onChangeStart}
                    />
                    <Input
                        type="date"
                        isDisabled={loading}
                        defaultValue={schedule.end.toISOString().split("T")[0]}
                        onChange={onChangeEnd}
                    />
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Stack direction="row">
                    <PrimaryButton
                        onClick={onClickUpdate}
                        size="sm"
                        isDisabled={editSchedule.name == ""}
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
        </>
    );
};
