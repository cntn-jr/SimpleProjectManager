import { Stack } from "@chakra-ui/react";
import { Room } from "../../../types/room";
import { RoomBar } from "../../atomic/chat/RoomBar";

type Props = {
    rooms: Array<Room>;
};

export const ChatRoom = (props: Props) => {
    const { rooms } = props;
    console.log(rooms);
    return (
        <Stack
            bgColor="main.2.50"
            w={{ sm: "100px", md: "200px", lg: "250px" }}
            h="600px"
            overflowY="scroll"
            mt="50px"
        >
            {rooms.map((room) => (
                <RoomBar
                    key={room.room_id}
                    userName={`${room.first_name} ${room.last_name}`}
                    content={(Math.random() * 100).toString()}
                    isRead={true}
                    roomId={room.room_id}
                />
            ))}
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
