import { Select } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
    options: Array<string>;
    size: string;
    w: string;
    bgColor: string;
};

export const SimpleSelectBox = memo((props: Props) => {
    const { options, size, w, bgColor } = props;
    return (
        <Select size={size} w={w} bgColor={bgColor}>
            {options.map((opt) => (
                <option key={opt}>{opt}</option>
            ))}
        </Select>
    );
});
