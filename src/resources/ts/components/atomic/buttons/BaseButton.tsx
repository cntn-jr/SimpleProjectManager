import { border, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    size: string;
    backColor: string;
    border: string;
    leftIcon: any;
    onClick: () => void;
    isLoading: boolean;
    isDisabled: boolean;
};

export const BaseButton = (props: Props) => {
    const {
        children,
        size,
        backColor,
        border,
        leftIcon,
        onClick,
        isLoading,
        isDisabled,
    } = props;
    return (
        <Button
            color="font.1"
            background={backColor}
            onClick={onClick}
            size={size}
            variant="outline"
            border={border}
            leftIcon={leftIcon}
            isLoading={isLoading}
            isDisabled={isDisabled}
        >
            {children}
        </Button>
    );
};
