import { Stack, useDisclosure } from "@chakra-ui/react";
import {
    Gantt,
    Task,
    EventOption,
    StylingOption,
    ViewMode,
    DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { iconManager } from "../../../icon";
import { scheduleAtom } from "../../../recoil/scheduleAtom";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { ScheduleModal } from "./ScheduleModal";

type Props = {
    schedules: Array<any>;
    displayDate: Date;
};

export const Chart = (props: Props) => {
    const { schedules, displayDate } = props;
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editSchedule, setEditSchedule] = useRecoilState(scheduleAtom);

    const onClickAdd = () => {
        setIsUpdate(false);
        onOpen();
    };

    const onClickTask = (task: Task) => {
        setIsUpdate(true);
        setEditSchedule(task);
        onOpen();
    };

    return (
        <Stack
            w={{
                sm: "400px",
                md: "610px",
                lg: "800px",
                xl: "1000px",
                "2xl": "1200px",
            }}
            h="500px"
            p="5px"
            color="font.100"
        >
            <Stack
                direction="row"
                w={{
                    sm: "400px",
                    md: "610px",
                    lg: "800px",
                    xl: "1000px",
                    "2xl": "1200px",
                }}
                h="60px"
            >
                <PrimaryButton
                    leftIcon={iconManager.add}
                    size="sm"
                    isDisabled={false}
                    isLoading={false}
                    onClick={onClickAdd}
                >
                    Add
                </PrimaryButton>
            </Stack>
            <Gantt
                tasks={schedules}
                listCellWidth=""
                ganttHeight={500}
                viewDate={displayDate}
                todayColor="rgba(2, 62, 138, 0.5)"
                onClick={onClickTask}
            />

            <ScheduleModal
                isOpen={isOpen}
                onClose={onClose}
                isUpdate={isUpdate}
                schedule={editSchedule}
            />
        </Stack>
    );
};
