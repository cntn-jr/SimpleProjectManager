import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
    userName: string;
    content: string;
    roomId: number;
    isRead: boolean;
};

export const RoomBar = (props: Props) => {
    const { userName, content, roomId, isRead } = props;
    const [ isOpenRoom, setIsOpenRoom ] = useState(isRead);
    const onClick = () => {
        // isReadをtrueに書き換える処理
        setIsOpenRoom(true);
    };
    return (
        <Box
            h="150px"
            borderBottom="1px solid"
            borderColor="main.1"
            px="10px"
            py="5px"
            color={isOpenRoom ? "font.70" : "font.100"}
            cursor="pointer"
            onClick={onClick}
        >
            <Stack h="40px" display="flex" justifyContent="center">
                <Text fontSize="md" as="b" w="100%" noOfLines={1}>
                    {userName}
                </Text>
            </Stack>
            <Stack h="110px">
                <Text fontSize="sm" noOfLines={4}>
                    {content}
                </Text>
            </Stack>
        </Box>
    );
};
