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
        console.log(history);
        history.push(`/${menuName}`);
        console.log(history);
    };

    const { icon, menuName } = props;

    return (
        <Box
            onClick={() => moveMainPage(menuName)}
            h="100px"
            _hover={{ opacity: 0.7 }}
        >
            {matchPath(location.pathname, `/${menuName}*`) ||
            (matchPath(location.pathname, { path: "/", exact: true }) &&
                menuName == "home") ? (
                <HStack color="sub.1">
                    {icon}
                    <Text fontSize="2xl" textTransform="uppercase">
                        {menuName}
                    </Text>
                </HStack>
            ) : (
                <HStack>
                    {icon}
                    <Text fontSize="2xl" textTransform="uppercase">
                        {menuName}
                    </Text>
                </HStack>
            )}
        </Box>
    );
});
