import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isChangedAtom } from "../recoil/isChangedAtom";
import { loadingAtom } from "../recoil/loadingAtom";
import { scheduleAtom } from "../recoil/scheduleAtom";
import { Schedule } from "../types/schedule";

type promiseType = (data: Array<any>) => void;

export const useSchedule = () => {
    const [schedules, setSchedules] = useState<Array<Schedule>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isChanged, setIsChanged] = useRecoilState(isChangedAtom);
    const [schedule, setSchedule] = useRecoilState(scheduleAtom);
    const [loadingDeleteButton, setLoadingDeleteButton] =
        useRecoilState(loadingAtom);
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

    const storeSchedule = () => {
        // ロード開始
        setLoading(true);
        // 開始日と終了日をDate→String
        const castedSchedule = {
            ...schedule,
            start: schedule.start.toISOString().split("T")[0],
            end: schedule.end.toISOString().split("T")[0],
        };
        // axios通信
        axios
            .post("/api/schedule/store", castedSchedule)
            .then(() => {
                // 作成成功
                toast({
                    title: "Schedule created.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                // 初期化
                setSchedule({
                    start: new Date(2020, 1, 1),
                    end: new Date(2020, 1, 2),
                    name: "Idea",
                    id: "Task 0",
                    type: "task",
                    progress: 100,
                });
            })
            .catch((err) => {
                // 作成失敗
                toast({
                    title: "You could not create task.",
                    status: "error",
                    isClosable: false,
                    position: "top-right",
                });
            })
            .finally(() => {
                // スケジュールデータに変更あり
                setIsChanged(!isChanged);
                // ロード終了
                setLoading(false);
            });
    };

    const updateSchedule = () => {
        // ロード開始
        setLoading(true);
        // 開始日と終了日をDate→String
        const castedSchedule = {
            ...schedule,
            start: schedule.start.toISOString().split("T")[0],
            end: schedule.end.toISOString().split("T")[0],
        };
        // axios通信
        axios
            .put("/api/schedule/update", castedSchedule)
            .then(() => {
                // 更新成功
                toast({
                    title: "Schedule updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                // 初期化
                setSchedule({
                    start: new Date(2020, 1, 1),
                    end: new Date(2020, 1, 2),
                    name: "Idea",
                    id: "Task 0",
                    type: "task",
                    progress: 100,
                });
            })
            .catch((err) => {
                // 更新失敗
                toast({
                    title: "You could not update task.",
                    status: "error",
                    isClosable: false,
                    position: "top-right",
                });
            })
            .finally(() => {
                // スケジュールデータに変更あり
                setIsChanged(!isChanged);
                // ロード終了
                setLoading(false);
            });
    };

    const deleteSchedule = () => {
        // ロード開始
        setLoading(true);
        setLoadingDeleteButton(true);
        // axios通信
        axios
            .put("/api/schedule/delete", schedule)
            .then(() => {
                // 更新成功
                toast({
                    title: "Schedule deleted.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                // 初期化
                setSchedule({
                    start: new Date(2020, 1, 1),
                    end: new Date(2020, 1, 2),
                    name: "Idea",
                    id: "Task 0",
                    type: "task",
                    progress: 100,
                });
            })
            .catch((err) => {
                // 更新失敗
                toast({
                    title: "You could not delete task.",
                    status: "error",
                    isClosable: false,
                    position: "top-right",
                });
            })
            .finally(() => {
                // スケジュールデータに変更あり
                setIsChanged(!isChanged);
                // ロード終了
                setLoading(false);
                setLoadingDeleteButton(false);
            });
    };
    return {
        schedules,
        getSchedules,
        storeSchedule,
        updateSchedule,
        deleteSchedule,
        loading,
    };
};
