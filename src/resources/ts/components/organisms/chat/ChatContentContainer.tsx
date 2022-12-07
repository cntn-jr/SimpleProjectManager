import { Stack, VStack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { chatContentsAtom } from "../../../recoil/chatContentsAtom";
import { ChatContent } from "../../molecules/ChatContent";
import { EnterMessage } from "../../molecules/EnterMessage";

export const ChatContentContainer = () => {
    const [contents, setContents] = useRecoilState(chatContentsAtom);
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
                {contents.map((content) => (
                    <ChatContent
                        key={content.content_id}
                        userName={`${content.last_name} ${content.first_name}`}
                        sendDate={content.content_created_at}
                        content={content.content}
                    />
                ))}
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
