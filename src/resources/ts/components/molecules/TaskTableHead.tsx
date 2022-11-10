import { Text, Th, Tr } from "@chakra-ui/react";
import { memo } from "react";

export const TaskTableHead = memo(() => {
    return (
        <Tr>
            <Th color="font.100" minW="40px" maxW="40px" w="40px" p="0">
                <></>
            </Th>

            <Th
                color="font.100"
                w={{
                    sm: "90px",
                    md: "300px",
                    lg: "400px",
                    xl: "500px",
                    "2xl": "600px",
                }}
                textAlign="center"
            >
                <Text noOfLines={1}>Title</Text>
            </Th>
            <Th
                color="font.100"
                w={{
                    sm: "80px",
                    md: "150px",
                    lg: "200px",
                    xl: "250px",
                    "2xl": "300px",
                }}
                textAlign="center"
            >
                <Text noOfLines={1}>Due</Text>
            </Th>
            <Th
                color="font.100"
                textAlign="center"
                w={{
                    sm: "120px",
                    md: "120px",
                    lg: "160px",
                    xl: "210px",
                    "2xl": "260px",
                }}
            >
                <Text noOfLines={1}>Priority</Text>
            </Th>
        </Tr>
    );
});
