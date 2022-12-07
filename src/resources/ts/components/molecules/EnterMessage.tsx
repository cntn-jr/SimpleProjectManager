import { HStack, IconButton, Input } from "@chakra-ui/react";
import { iconManager } from "../../icon";

export const EnterMessage = () => {
    return (
        <HStack spacing={0}>
            <IconButton
                icon={iconManager.send}
                aria-label="send message"
                w="30px"
                variant="unstyled"
            />
            <Input
                w={{ sm: "180px", md: "250px", lg: "400px" }}
                borderColor="main.1"
                placeholder="enter your message"
            />
        </HStack>
    );
};
