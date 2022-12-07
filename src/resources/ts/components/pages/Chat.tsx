import { Center, HStack, Spinner } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { usePrivateChatRoom } from "../../hooks/usePrivateChatRoom";
import { ChatContentContainer } from "../organisms/chat/ChatContentContainer";
import { ChatRoom } from "../organisms/chat/ChatRoom";

export const Chat = memo(() => {
    const { getRooms, rooms, loading } = usePrivateChatRoom();
    useEffect(() => {
        getRooms();
    }, []);
    return (
        <>
            {loading ? (
                <Center mt="200px">
                    <Spinner />
                </Center>
            ) : (
                <HStack spacing={0} mt="50px">
                    <ChatRoom rooms={rooms} />
                    <ChatContentContainer />
                </HStack>
            )}
        </>
    );
});
