import { memo, useEffect, useState } from "react";
import { useSchedule } from "../../hooks/useSchedule";
import { Center, Spinner } from "@chakra-ui/react";
import { Chart } from "../organisms/Chart";

export const Gantt = memo(() => {
    const { getSchedules } = useSchedule();
    const [loading, setLoading] = useState<boolean>(false);
    const [schedules, setSchedules] = useState<Array<any>>([
        {
            type: "task",
            start: new Date(2020, 1, 1),
            end: new Date(2020, 1, 2),
            name: "Idea",
            id: "Task 1",
            progress: 100,
        },
    ]);
    useEffect(() => {
        setLoading(true);
        getSchedules().then((schedules) => {
            let newSchedules: any[] = [];
            schedules.forEach((schedule) => {
                let newSchedule = {
                    ...schedule,
                    start: new Date(schedule.start),
                    end: new Date(schedule.end),
                };
                newSchedules.push(newSchedule);
            });
            setSchedules([...newSchedules]);
            setLoading(false);
        });
    }, []);
    return (
        <>
            {loading ? (
                <Center mt="200px">
                    <Spinner />
                </Center>
            ) : (
                <Chart schedules={schedules} />
            )}
        </>
    );
});
