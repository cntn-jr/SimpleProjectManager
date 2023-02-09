import { Stack } from "@chakra-ui/react";
import { memo, ReactNode } from "react";
import { ItemHeader } from "../atomic/ItemHeader";

type Props = {
    children: ReactNode;
    headerText: string;
};

export const UserBox = memo((props: Props) => {
    const { children, headerText } = props;
    return (
        <Stack
            w={{ sm: "300px", md: "500px" }}
            bgColor="main.2.100"
            mx="auto"
            mt="100px"
            p="20px"
            borderRadius="5px"
        >
            <ItemHeader text={headerText} borderColor="main.1" />
            {children}
        </Stack>
    );
});
