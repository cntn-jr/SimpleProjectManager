import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { isFinishedTaskAtom } from "../../../recoil/isFinishedTaskAtom";

export const FinishedTaskSwitch = memo(() => {
    const [isFinishedTask, setIsFinishedTask] =
        useRecoilState(isFinishedTaskAtom);
    const onChange = () => {
        setIsFinishedTask((oldIsFinishedTask) => {
            return !oldIsFinishedTask;
        });
    };
    return (
        <FormControl
            display="flex"
            alignItems="center"
            w={{ sm: "40px", md: "200px", lg: "250px" }}
        >
            <FormLabel
                htmlFor="show-finished-task"
                mb="0"
                display={{ sm: "none", md: "block" }}
            >
                Show Finished Task
            </FormLabel>
            <Switch
                id="show-finished-task"
                size="sm"
                defaultChecked={isFinishedTask}
                onChange={onChange}
            />
        </FormControl>
    );
});
