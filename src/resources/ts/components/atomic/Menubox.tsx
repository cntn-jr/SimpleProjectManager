import { Box, HStack, Text } from "@chakra-ui/react";
import { memo } from "react";
import { matchPath, useHistory, useLocation } from "react-router-dom";

type Props = {
    icon: any;
    menuName: string;
};

export const Menubox = memo((props: Props) => {
    const history = useHistory();

    const location = useLocation();

    const moveMainPage = (menuName: string) => {
        history.push(`/${menuName}`);
    };

    const { icon, menuName } = props;

    return (
        <Box h="100px" display="flex" alignItems="center">
            {matchPath(location.pathname, `/${menuName}*`) ? (
                <HStack
                    color="sub.1"
                    cursor="pointer"
                    _hover={{ opacity: 0.7 }}
                    onClick={() => moveMainPage(menuName)}
                >
                    {icon}
                    <Text fontSize="lg" textTransform="uppercase">
                        {menuName}
                    </Text>
                </HStack>
            ) : (
                <HStack
                    cursor="pointer"
                    _hover={{ opacity: 0.7 }}
                    onClick={() => moveMainPage(menuName)}
                >
                    {icon}
                    <Text fontSize="lg" textTransform="uppercase">
                        {menuName}
                    </Text>
                </HStack>
            )}
        </Box>
    );
});
