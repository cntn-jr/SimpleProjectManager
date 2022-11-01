import { Select, Stack } from "@chakra-ui/react";
import { memo, ReactNode } from "react";
import { iconManager } from "../../../icon";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { SimpleSelectBox } from "../../atomic/SimpleSelectBox";
import { OrderRadioGroup } from "../../atomic/task/OrderRadioGroup";

type Props = {
    onClickRadio: () => void;
};

export const TaskHeader = memo((props: Props) => {
    const { onClickRadio } = props;
    return (
        <Stack
            spacing={5}
            direction="row"
            w={{
                sm: "330px",
                md: "610px",
                lg: "800px",
                xl: "1000px",
                "2xl": "1200px",
            }}
            h="40px"
            position="fixed"
            justifyContent="space-between"
            overflowX="scroll"
        >
            <Stack w="80px">
                <PrimaryButton
                    size="sm"
                    onClick={() => alert()}
                    leftIcon={iconManager.add}
                >
                    Add
                </PrimaryButton>
            </Stack>

            <Stack textAlign="right" direction="row">
                <OrderRadioGroup onClickRadio={onClickRadio} />
                <SimpleSelectBox
                    options={["Tasks", "Due", "Priority", "Finished"]}
                    size="sm"
                    w="300px"
                    bgColor="main.1"
                />
            </Stack>
        </Stack>
    );
});
