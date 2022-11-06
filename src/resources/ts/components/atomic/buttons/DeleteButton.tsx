import { iconManager } from "../../../icon";
import { BaseButton } from "./BaseButton";

type Props = {
    onClick: () => void;
    isDisabled: boolean;
};

export const DeleteButton = (props: Props) => {
    const { onClick, isDisabled } = props;
    return (
        <BaseButton
            size="md"
            backColor="high"
            border="high"
            leftIcon={iconManager.delete}
            onClick={onClick}
            isLoading={false}
            isDisabled={isDisabled}
        >
            Delete
        </BaseButton>
    );
};
