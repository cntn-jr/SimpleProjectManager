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
import { useRecoilState } from "recoil";
import { scheduleAtom } from "../../../recoil/scheduleAtom";
import { ScheduleModal } from "./ScheduleModal";

type Props = {
    schedules: Array<any>;
};

export const Chart = (props: Props) => {
    const { schedules } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editSchedule, setEditSchedule] = useRecoilState(scheduleAtom);

    const onClick = (task: Task) => {
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
            color="font.100"
            bgColor="main.2.100"
        >
            <Gantt
                tasks={schedules}
                listCellWidth=""
                ganttHeight={500}
                todayColor="rgba(2, 62, 138, 0.5)"
                onClick={onClick}
            />

            <ScheduleModal
                isOpen={isOpen}
                onClose={onClose}
                isUpdate={true}
                schedule={editSchedule}
            />
        </Stack>
    );
};
