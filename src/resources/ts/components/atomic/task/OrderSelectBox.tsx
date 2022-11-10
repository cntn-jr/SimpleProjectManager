import { Select } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
    sortDue: () => void;
    sortTitle: () => void;
    sortPriority: () => void;
    isDisabled: boolean;
};

export const OrderSelectBox = memo((props: Props) => {
    const { sortDue, sortTitle, sortPriority, isDisabled } = props;
    const order: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        if (e.target.value == "Title") {
            sortTitle();
        } else if (e.target.value == "Priority") {
            sortPriority();
        } else {
            sortDue();
        }
    };
    return (
        <Select
            size="sm"
            w="200px"
            bgColor="main.1"
            onChange={(e) => order(e)}
            defaultValue="Due"
            isDisabled={isDisabled}
        >
            <option value="Due">Due</option>
            <option value="Title">Title</option>
            <option value="Priority">Priority</option>
        </Select>
    );
});
