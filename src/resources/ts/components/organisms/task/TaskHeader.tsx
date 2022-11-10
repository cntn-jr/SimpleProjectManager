import { Stack } from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { iconManager } from "../../../icon";
import { loadingAtom } from "../../../recoil/loadingAtom";
import { PrimaryButton } from "../../atomic/buttons/PrimaryButton";
import { OrderSelectBox } from "../../atomic/task/OrderSelectBox";
import { OrderRadioGroup } from "../../atomic/task/OrderRadioGroup";
import { FinishedTaskSwitch } from "../../atomic/task/FinishedTaskSwitch";

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
    const [loading] = useRecoilState(loadingAtom);
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
            alignItems="center"
        >
            <Stack w="80px">
                {showAddBtn ? (
                    <PrimaryButton
                        size="sm"
                        onClick={onClickAdd}
                        leftIcon={iconManager.add}
                        isLoading={false}
                        isDisabled={loading}
                    >
                        Add
                    </PrimaryButton>
                ) : (
                    <></>
                )}
            </Stack>

            <Stack textAlign="right" direction="row" h="40px">
                <FinishedTaskSwitch />
                <OrderRadioGroup
                    onClickRadio={onClickRadio}
                    isDisabled={loading}
                />
                <OrderSelectBox
                    sortDue={sortDue}
                    sortTitle={sortTitle}
                    sortPriority={sortPriority}
                    isDisabled={loading}
                />
            </Stack>
        </Stack>
    );
});
