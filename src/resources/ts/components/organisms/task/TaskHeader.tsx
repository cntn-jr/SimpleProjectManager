import { Select, Stack } from "@chakra-ui/react";
import { memo, ReactNode } from "react";
import { iconManager } from "../../../icon";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { OrderSelectBox } from "../../atomic/OrderSelectBox";
import { OrderRadioGroup } from "../../atomic/task/OrderRadioGroup";

type Props = {
    onClickRadio: () => void;
    onClickAdd: () => void;
    sortDue: () => void;
    sortTitle: () => void;
    sortPriority: () => void;
    showAddBtn: boolean;
};

export const TaskHeader = memo((props: Props) => {
    const {
        onClickRadio,
        onClickAdd,
        sortDue,
        sortTitle,
        sortPriority,
        showAddBtn,
    } = props;
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
                {showAddBtn ? (
                    <PrimaryButton
                        size="sm"
                        onClick={onClickAdd}
                        leftIcon={iconManager.add}
                        isLoading={false}
                        isDisabled={false}
                    >
                        Add
                    </PrimaryButton>
                ) : (
                    <></>
                )}
            </Stack>

            <Stack textAlign="right" direction="row">
                <OrderRadioGroup onClickRadio={onClickRadio} />
                <OrderSelectBox
                    sortDue={sortDue}
                    sortTitle={sortTitle}
                    sortPriority={sortPriority}
                />
            </Stack>
        </Stack>
    );
});
