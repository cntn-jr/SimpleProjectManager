import { Text } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
    text: string;
    borderColor: string;
};

export const ItemHeader = memo((props: Props) => {
    const { text, borderColor } = props;
    return (
        <Text
            fontSize="lg"
            as="b"
            borderBottom="1px solid"
            borderColor={borderColor}
            mr="auto"
            ml="30px"
            mb="20px"
        >
            {text}
        </Text>
    );
});
