import { Box, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

export const Setting = memo(() => {
    const { logout } = useAuthentication();
    const userMenuList: Array<{ menuName: string; onClick: () => void }> = [
        { menuName: "Profile", onClick: () => alert() },
        { menuName: "Password", onClick: () => alert() },
        { menuName: "Log out", onClick: logout },
    ];
    const projectMenuList: Array<{ menuName: string; onClick: () => void }> = [
        { menuName: "Invitation to this Project", onClick: () => alert() },
        { menuName: "Invitationed Projects", onClick: () => alert() },
        { menuName: "Switch Project", onClick: () => alert() },
        { menuName: "Delete this Project", onClick: () => alert() },
    ];
    return (
        <VStack
            bgColor="main.2.100"
            w={{
                sm: "350px",
                md: "350px",
                lg: "350px",
                xl: "480px",
                "2xl": "580px",
            }}
        >
            {userMenuList.map((menu) => (
                <Box
                    key={menu.menuName}
                    h="100px"
                    _hover={{ opacity: 0.7 }}
                    display="flex"
                    alignItems="center"
                    cursor="pointer"
                    borderBottom="1px solid"
                    borderColor="font.100"
                    onClick={menu.onClick}
                >
                    {menu.menuName}
                </Box>
            ))}
        </VStack>
    );
});
