import { memo } from "react";
import { iconManager } from "../../../icon";
import { BaseButton } from "./BaseButton";

type Props = {
    size: string;
    onClick: () => void;
    isDisabled: boolean;
    isLoading: boolean;
};

export const DeleteButton = memo((props: Props) => {
    const { size, onClick, isDisabled, isLoading } = props;
    return (
        <BaseButton
            size={size}
            backColor="high"
            border="high"
            leftIcon={iconManager.delete}
            onClick={onClick}
            isLoading={isLoading}
            isDisabled={isDisabled}
        >
            Delete
        </BaseButton>
    );
});
