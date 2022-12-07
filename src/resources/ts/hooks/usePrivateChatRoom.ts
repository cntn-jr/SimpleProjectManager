import axios from "axios";
import { useState } from "react";
import { chatContent } from "../types/chatContent";
import { Room } from "../types/room";

export const usePrivateChatRoom = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Array<Room>>([
        { room_id: 0, first_name: "first", last_name: "last" },
    ]);
    const [contents, setContents] = useState<Array<chatContent>>([
        { id: 0, room_id: 0, content: "", created_at: "" },
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
    const getContents = (room_id: number) => {
        axios
            .get<Array<chatContent>>("/api/room/" + room_id + "/content")
            .then((res) => {
                console.log(res.data);
                setContents(res.data);
            });
    };
    return { getRooms, rooms, getContents, contents, loading };
};
