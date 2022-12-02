import { Center, Spinner } from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { usePrivateChatRoom } from "../../hooks/usePrivateCharRoom";
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
                <>
                    <ChatRoom rooms={rooms} />
                </>
            )}
        </>
    );
});
