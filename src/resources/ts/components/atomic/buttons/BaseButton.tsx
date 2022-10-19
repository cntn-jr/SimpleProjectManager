import { border, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    backColor: string;
    border: string;
    leftIcon: any;
    onClick: () => void;
};

export const BaseButton = (props: Props) => {
    const { children, backColor, border, leftIcon, onClick } = props;
    return (
        <Button
            color="font.1"
            background={backColor}
            onClick={onClick}
            size="md"
            variant="outline"
            border={border}
            leftIcon={leftIcon}
        >
            {children}
        </Button>
    );
};
