import { Stack, VStack } from "@chakra-ui/react";
import { ChatContent } from "../../molecules/ChatContent";
import { EnterMessage } from "../../molecules/EnterMessage";

export const ChatContentContainer = () => {
    return (
        <VStack
            bgColor="main.2.100"
            h="600px"
            w={{ sm: "250px", md: "430px", lg: "580px" }}
            spacing={0}
        >
            <VStack
                h="500px"
                spacing={0}
                flexDirection="column-reverse"
                overflowY="scroll"
            >
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
                <ChatContent />
            </VStack>
            <Stack
                h="100px"
                borderTop="solid 2px"
                borderColor="main.1"
                w={{ sm: "250px", md: "430px", lg: "580px" }}
                direction="row"
                justifyContent="space-around"
            >
                <EnterMessage />
            </Stack>
        </VStack>
    );
};
