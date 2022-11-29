import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Task } from "gantt-task-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isChangedAtom } from "../recoil/isChangedAtom";
import { scheduleAtom } from "../recoil/scheduleAtom";
import { Schedule } from "../types/schedule";

type promiseType = (data: Array<any>) => void;

export const useSchedule = () => {
    const [schedules, setSchedules] = useState<Array<Schedule>>([]);
    const [schedulesLoading, setSchedulesLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useRecoilState(isChangedAtom);
    const [editSchedule, setEditSchedule] = useRecoilState(scheduleAtom);
    const toast = useToast();
    const getSchedules = () => {
        return new Promise((resolve: promiseType, reject: promiseType) => {
            axios
                .get<Array<any>>("api/schedules")
                .then((res) => {
                    return resolve(res.data);
                })
                .catch(() => {
                    return reject([]);
                });
        });
    };

    const updateSchedule = () => {
        setLoading(true);
        const castedSchedule = {
            ...editSchedule,
            start: editSchedule.start.toISOString().split("T")[0],
            end: editSchedule.end.toISOString().split("T")[0],
        };
        axios
            .put("/api/schedule/update", castedSchedule)
            .then(() => {
                toast({
                    title: "Schedule updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                setEditSchedule({
                    start: new Date(2020, 1, 1),
                    end: new Date(2020, 1, 2),
                    name: "Idea",
                    id: "Task 0",
                    type: "task",
                    progress: 100,
                });
            })
            .catch((err) => {
                toast({
                    title: "You could not update task.",
                    status: "error",
                    isClosable: false,
                    position: "top-right",
                });
            })
            .finally(() => {
                setIsChanged(!isChanged);
                setLoading(false);
            });
    };
    return { schedules, getSchedules, updateSchedule, loading };
};
