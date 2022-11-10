import { Box, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { MenuList } from "../../MenuList";
import { Menubox } from "../atomic/Menubox";

export const Menubar = memo(() => {
    return (
        <VStack spacing="0">
            <Box h="100px" display="flex" alignItems="center">
                <Text
                    fontSize="lg"
                    as="b"
                    color={{
                        sm: "green",
                        md: "blue",
                        lg: "yellow",
                        xl: "orange",
                        '2xl': "red"
                    }}
                >
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
