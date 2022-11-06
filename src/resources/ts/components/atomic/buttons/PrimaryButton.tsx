import { ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type Props = {
    leftIcon: ReactNode;
    children: ReactNode;
    size: string;
    onClick: () => void;
    isLoading: boolean;
    isDisabled: boolean;
};

export const PrimaryButton = (props: Props) => {
    const { leftIcon, children, size, onClick, isLoading, isDisabled } = props;
    return (
        <BaseButton
            size={size}
            backColor="sub.1"
            border="main.1"
            leftIcon={leftIcon}
            onClick={onClick}
            isLoading={isLoading}
            isDisabled={isDisabled}
        >
            {children}
        </BaseButton>
    );
};
