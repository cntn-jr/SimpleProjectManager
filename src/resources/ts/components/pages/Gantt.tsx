import { memo, useEffect, useState } from "react";
import { useSchedule } from "../../hooks/useSchedule";
import { Center, Spinner } from "@chakra-ui/react";
import { Chart } from "../organisms/gantt/Chart";
import { useRecoilState } from "recoil";
import { isChangedAtom } from "../../recoil/isChangedAtom";

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
    const [isChanged] = useRecoilState(isChangedAtom);
    const [displayDate ,setDisplayDate] = useState<Date>(new Date());
    useEffect(() => {
        setLoading(true);
        setDisplayDate( () => {
            const date = new Date();
            date.setDate(date.getDate() + -4);
            return date;
        } );
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
    }, [isChanged]);
    return (
        <>
            {loading ? (
                <Center mt="200px">
                    <Spinner />
                </Center>
            ) : (
                <Chart schedules={schedules} displayDate={displayDate} />
            )}
        </>
    );
});
