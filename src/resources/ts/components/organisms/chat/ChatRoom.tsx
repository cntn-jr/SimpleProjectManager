import { Stack } from "@chakra-ui/react";
import { RoomBar } from "../../atomic/chat/RoomBar";

export const ChatRoom = () => {
    return (
        <Stack
            bgColor="main.2.50"
            w={{ sm: "100px", md: "200px", lg: "250px" }}
            h="600px"
            overflowY="scroll"
            mt="50px"
        >
            <RoomBar
                userName="西田 雅哉"
                content={(Math.random() * 100).toString()}
                isRead={true}
                roomId={0}
            />
            <RoomBar
                userName="西田 ゆいと"
                content={(Math.random() * 100).toString()}
                isRead={true}
                roomId={0}
            />
            <RoomBar
                userName="西田 しょうご"
                content={(Math.random() * 100).toString()}
                isRead={false}
                roomId={0}
            />
            <RoomBar
                userName="西田 ゆうき"
                content={(Math.random() * 100).toString()}
                isRead={true}
                roomId={0}
            />
            <RoomBar
                userName="西田 ままま"
                content={(Math.random() * 100).toString()}
                isRead={true}
                roomId={0}
            />
            <RoomBar
                userName="西田 ちびちゃん"
                content={(Math.random() * 100).toString()}
                isRead={false}
                roomId={0}
            />
        </Stack>
    );
};
