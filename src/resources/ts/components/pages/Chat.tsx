import { memo } from "react";
import { ChatRoom } from "../organisms/chat/ChatRoom";

export const Chat = memo(() => {
    return (
        <>
            <ChatRoom />
        </>
    );
});
