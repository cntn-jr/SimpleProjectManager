import { Box, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { usePrivateChatRoom } from "../../../hooks/usePrivateChatRoom";
import { chatMessageAtom } from "../../../recoil/chatMessage";
import { loadingChatContainerAtom } from "../../../recoil/loadingChatContainerAtom";
import { openRoomIdAtom } from "../../../recoil/openRoomIdAtom";

type Props = {
    userName: string;
    roomId: number;
    isRead: boolean;
};

export const RoomBar = (props: Props) => {
    const { userName, roomId, isRead } = props;
    const [isOpenRoom, setIsOpenRoom] = useState(isRead);
    const [openRoomId, setOpenRoomId] = useRecoilState(openRoomIdAtom);
    const [loadingContainer, setLoadingContainer] = useRecoilState(
        loadingChatContainerAtom
    );
    const [message, setMessage] = useRecoilState(chatMessageAtom);
    const { getContents } = usePrivateChatRoom();
    const onClick = () => {
        setLoadingContainer(true);
        // isReadをtrueに書き換える処理
        setIsOpenRoom(true);
        getContents(roomId);
        setOpenRoomId(roomId);
        setMessage((oldMessage) => {
            return { ...oldMessage, room_id: roomId };
        });
    };
    return (
        <Box
            h="50px"
            borderBottom="1px solid"
            borderColor="main.1"
            color={isOpenRoom ? "font.70" : "font.100"}
            cursor="pointer"
            onClick={onClick}
            bgColor={openRoomId == roomId ? "sub.1" : "main.2.50"}
        >
            <Stack m={0} h="50px" display="flex" justifyContent="center">
                <Text
                    fontSize="md"
                    as="b"
                    w="100%"
                    noOfLines={1}
                    textAlign="center"
                >
                    {userName}
                </Text>
            </Stack>
        </Box>
    );
};
