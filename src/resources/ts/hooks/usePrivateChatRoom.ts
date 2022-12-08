import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { chatContentsAtom } from "../recoil/chatContentsAtom";
import { loadingChatContainerAtom } from "../recoil/loadingChatContainerAtom";
import { openRoomIdAtom } from "../recoil/openRoomIdAtom";
import { chatContent } from "../types/chatContent";
import { Room } from "../types/room";

export const usePrivateChatRoom = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Array<Room>>([
        { room_id: 0, first_name: "first", last_name: "last" },
    ]);
    const [contents, setContents] = useRecoilState(chatContentsAtom);
    const [openRoomId, setOpenRoomId] = useRecoilState(openRoomIdAtom);
    const [loadingContainer, setLoadingContainer] = useRecoilState(
        loadingChatContainerAtom
    );
    const getRooms = () => {
        setLoading(true);
        axios
            .get<Array<Room>>("api/room/private")
            .then((res) => {
                setRooms([...res.data]);
                getContents(res.data[0].room_id);
                setOpenRoomId(res.data[0].room_id);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getContents = (room_id: number) => {
        axios
            .get<Array<chatContent>>("/api/room/" + room_id + "/content")
            .then((res) => {
                setContents([...res.data]);
            })
            .finally(() => {
                setLoadingContainer(false);
            });
    };
    return {
        getRooms,
        rooms,
        getContents,
        contents,
        loading,
    };
};
