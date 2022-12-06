import axios from "axios";
import { useState } from "react";
import { Room } from "../types/room";

export const usePrivateChatRoom = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Array<Room>>([
        { room_id: 0, first_name: "first", last_name: "last" },
    ]);
    const getRooms = () => {
        setLoading(true);
        axios
            .get<Array<Room>>("api/room/private")
            .then((res) => {
                setRooms([...res.data]);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return { getRooms, rooms, loading };
};
