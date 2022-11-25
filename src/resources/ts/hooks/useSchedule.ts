import axios from "axios";
import { useState } from "react";
import { Schedule } from "../types/schedule";

type promiseType = (data: Array<any>) => void;

export const useSchedule = () => {
    const [schedules, setSchedules] = useState<Array<Schedule>>([]);
    const [schedulesLoading, setSchedulesLoading] = useState<boolean>(false);
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
    return { schedules, getSchedules };
};
