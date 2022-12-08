import { HStack, IconButton, Input } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { usePrivateChatRoom } from "../../../hooks/usePrivateChatRoom";
import { iconManager } from "../../../icon";
import { OperationChatForm } from "../../../OperationForm/OperationChatForm";
import { chatMessageAtom } from "../../../recoil/chatMessage";
import { loadingChatContainerAtom } from "../../../recoil/loadingChatContainerAtom";

export const EnterMessage = () => {
    const { storeContent } = usePrivateChatRoom();
    const { onChangeContent } = OperationChatForm();
    const [message] = useRecoilState(chatMessageAtom);
    const [loadingContainer, setLoadingContainer] = useRecoilState(
        loadingChatContainerAtom
    );
    return (
        <HStack spacing={0}>
            <IconButton
                icon={iconManager.send}
                aria-label="send message"
                w="30px"
                variant="unstyled"
                onClick={storeContent}
                disabled={message.content == ""}
                isLoading={loadingContainer}
            />
            <Input
                w={{ sm: "180px", md: "250px", lg: "400px" }}
                borderColor="main.1"
                placeholder="enter your message"
                value={message.content}
                onChange={onChangeContent}
                disabled={loadingContainer}
            />
        </HStack>
    );
};
