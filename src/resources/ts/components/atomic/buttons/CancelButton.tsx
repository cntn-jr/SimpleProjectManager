import { BaseButton } from "./BaseButton";

type Props = {
    onClick: () => void;
    size?: string;
    isDisabled: boolean;
};

export const CancelButton = (props: Props) => {
    const { onClick, size = "md", isDisabled } = props;
    return (
        <BaseButton
            size={size}
            backColor="main.1"
            border="main.1"
            leftIcon={null}
            onClick={onClick}
            isLoading={false}
            isDisabled={isDisabled}
        >
            Cancel
        </BaseButton>
    );
};
