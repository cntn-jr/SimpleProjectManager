import { Radio, RadioGroup, Stack, useRadio } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
    onClickRadio: () => void;
};

export const OrderRadioGroup = memo((props: Props) => {
    const { onClickRadio } = props;

    return (
        <RadioGroup defaultValue="1" onChange={onClickRadio}>
            <Stack spacing={5} direction="row">
                <Radio value="1">Asc</Radio>
                <Radio value="2">Desc</Radio>
            </Stack>
        </RadioGroup>
    );
});
