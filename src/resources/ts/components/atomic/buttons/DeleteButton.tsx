import { iconManager } from "../../../icon";
import { BaseButton } from "./BaseButton";

type Props = {
    onClick: () => void;
};

export const DeleteButton = (props: Props) => {
    const { onClick } = props;
    return (
        <BaseButton
            backColor="high"
            border="high"
            leftIcon={iconManager.delete}
            onClick={onClick}
        >
            Delete
        </BaseButton>
    );
};
