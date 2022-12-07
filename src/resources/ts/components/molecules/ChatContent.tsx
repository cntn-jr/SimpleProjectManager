import { HStack, Text, VStack } from "@chakra-ui/react";

export const ChatContent = () => {
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
                    西田 雅哉
                </Text>
                <Text fontSize="sm">11/11 10:50</Text>
            </HStack>
            <Text
                fontSize="md"
                w={{ sm: "250px", md: "430px", lg: "580px" }}
                px="20px"
            >
                まままのま
            </Text>
        </VStack>
    );
};
