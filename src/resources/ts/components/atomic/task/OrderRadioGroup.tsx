import { Radio, RadioGroup, Stack, useRadio } from "@chakra-ui/react";
import { memo } from "react";

type Props = {
    onClickRadio: () => void;
    isDisabled: boolean;
};

export const OrderRadioGroup = memo((props: Props) => {
    const { onClickRadio, isDisabled } = props;

    return (
        <RadioGroup
            defaultValue="1"
            onChange={onClickRadio}
            isDisabled={isDisabled}
        >
            <Stack spacing={5} direction="row">
                <Radio value="1">Asc</Radio>
                <Radio value="2">Desc</Radio>
            </Stack>
        </RadioGroup>
    );
});
