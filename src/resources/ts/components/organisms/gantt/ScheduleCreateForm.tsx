import {
    Input,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Stack,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { useSchedule } from "../../../hooks/useSchedule";
import { iconManager } from "../../../icon";
import { scheduleAtom } from "../../../recoil/scheduleAtom";
import { CancelButton } from "../../atomic/buttons/CancelButton";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";

type Props = {
    onClose: () => void;
};

export const ScheduleCreateForm = (props: Props) => {
    const { onClose } = props;
    const { storeSchedule, loading } = useSchedule();
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
    const onClickStore = () => {
        storeSchedule();
    };
    return (
        <>
            <ModalHeader color="font.100" h="80px">
                Schedule Add
            </ModalHeader>
            <ModalBody justifyContent="space-around" h="120px">
                <Stack
                    direction="row"
                    h="40px"
                    my="20px"
                    justifyContent="space-around"
                >
                    <Input
                        placeholder="title"
                        isDisabled={loading}
                        onChange={onChangeTitle}
                    />
                </Stack>
                <Stack direction="row" h="40px" justifyContent="space-around">
                    <Input
                        type="date"
                        isDisabled={loading}
                        onChange={onChangeStart}
                    />
                    <Input
                        type="date"
                        isDisabled={loading}
                        onChange={onChangeEnd}
                    />
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Stack direction="row">
                    <PrimaryButton
                        onClick={onClickStore}
                        size="sm"
                        isDisabled={editSchedule.name == ""}
                        isLoading={loading}
                        leftIcon={iconManager.check}
                    >
                        OK
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
