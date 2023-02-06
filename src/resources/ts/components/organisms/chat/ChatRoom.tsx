import { Stack } from "@chakra-ui/react";
import { Room } from "../../../types/room";
import { RoomBar } from "../../atomic/chat/RoomBar";

type Props = {
    rooms: Array<Room>;
};

export const ChatRoom = (props: Props) => {
    const { rooms } = props;
    return (
        <Stack
            bgColor="main.2.50"
            w={{ sm: "80px", md: "180px", lg: "220px" }}
            h="600px"
            overflowY="scroll"
            spacing={0}
        >
            {rooms.map((room) => (
                <RoomBar
                    key={room.room_id}
                    userName={`${room.last_name} ${room.first_name}`}
                    isRead={true}
                    roomId={room.room_id}
                />
            ))}
        </Stack>
    );
};
