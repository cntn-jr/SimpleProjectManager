import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { MenuList } from "../../MenuList";
import { Menubox } from "../atomic/Menubox";

export const Menubar = memo(() => {
    return (
        <VStack w="253px" align="center" spacing="0">
            <Box h="100px">
                <Text fontSize="2xl" as="b">
                    Project Name
                </Text>
            </Box>
            {MenuList.map((menu) => (
                <Menubox
                    key={menu.menuName}
                    menuName={menu.menuName}
                    icon={menu.icon}
                />
            ))}
        </VStack>
    );
});
