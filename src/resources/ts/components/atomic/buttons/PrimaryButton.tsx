import { ReactNode } from "react";
import { BaseButton } from "./BaseButton";

type Props = {
    leftIcon: ReactNode;
    children: ReactNode;
    onClick: () => void;
};

export const PrimaryButton = (props: Props) => {
    const { leftIcon, children, onClick } = props;
    return (
        <BaseButton backColor="sub.1" border="main.1" leftIcon={leftIcon} onClick={onClick}>{children}</BaseButton>
    );
};