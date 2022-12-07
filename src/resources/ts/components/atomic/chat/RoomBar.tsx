import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { usePrivateChatRoom } from "../../../hooks/usePrivateChatRoom";

type Props = {
    userName: string;
    roomId: number;
    isRead: boolean;
};

export const RoomBar = (props: Props) => {
    const { userName, roomId, isRead } = props;
    const [isOpenRoom, setIsOpenRoom] = useState(isRead);
    const {getContents} = usePrivateChatRoom();
    const onClick = () => {
        // isReadをtrueに書き換える処理
        setIsOpenRoom(true);
        getContents(roomId);
    };
    return (
        <Box
            h="50px"
            borderBottom="1px solid"
            borderColor="main.1"
            color={isOpenRoom ? "font.70" : "font.100"}
            cursor="pointer"
            onClick={onClick}
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
