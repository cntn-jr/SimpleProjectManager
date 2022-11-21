import { Box, Button, Center, Image, Text, VStack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

type Props = {
    isToHome: boolean;
};

export const Page404 = (props: Props) => {
    const { isToHome } = props;
    const history = useHistory();
    const onClickToHome = () => {
        history.replace("/home");
    };
    const onClickToLogin = () => {
        history.replace("/login");
    };
    return (
        <Center mt="20px">
            <VStack>
                <Text as="b" fontSize="50px">
                    Sorry...
                </Text>
                <Text fontSize="30px">we couldn't find that page.</Text>
                <Box w="300px" h="250px">
                    <Image src="https://source.unsplash.com/H0GXgpGXysc" />
                </Box>
                {isToHome ? (
                    <Button
                        variant="outline"
                        onClick={onClickToHome}
                        bgColor="main.2.100"
                    >
                        To Home
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        onClick={onClickToLogin}
                        bgColor="main.2.100"
                    >
                        To Login
                    </Button>
                )}
            </VStack>
        </Center>
    );
};
