import { BaseButton } from "./BaseButton";

type Props = {
    onClick: () => void;
};

export const CancelButton = (props: Props) => {
    const { onClick } = props;
    return (
        <BaseButton backColor="main.1" border="main.1" leftIcon={null} onClick={onClick}>
            Cancel
        </BaseButton>
    );
};