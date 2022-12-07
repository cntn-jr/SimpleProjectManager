import { HStack, Text, VStack } from "@chakra-ui/react";

type Props = {
    userName: string;
    sendDate: string;
    content: string;
};
export const ChatContent = (props: Props) => {
    const { userName, sendDate, content } = props;
    return (
        <VStack borderTop="1px solid" borderColor="main.1" spacing={0} py="5px">
            <HStack
                w={{ sm: "250px", md: "430px", lg: "580px" }}
                display="flex"
                justifyContent="space-between"
                px="20px"
                mb="10px"
            >
                <Text fontSize="sm" as="b">
                    {userName}
                </Text>
                <Text fontSize="sm">{sendDate}</Text>
            </HStack>
            <Text
                fontSize="md"
                w={{ sm: "250px", md: "430px", lg: "580px" }}
                px="20px"
            >
                {content}
            </Text>
        </VStack>
    );
};
