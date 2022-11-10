import { Input, Select, Stack, Textarea, VStack } from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";

import moment from "moment";

const today = moment();

type Props = {
    title?: string;
    due?: string;
    priority?: "high" | "middle" | "low" | string;
    description?: string;
    onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeDue: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangePriority: (e: ChangeEvent<HTMLSelectElement>) => void;
    onChangeDescription: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    isLoading: boolean;
};

export const TaskForm = memo((props: Props) => {
    const {
        title = "",
        due = today.format("YYYY-MM-DD").toString(),
        priority = "middle",
        description = "",
        onChangeTitle,
        onChangeDue,
        onChangePriority,
        onChangeDescription,
        isLoading,
    } = props;
    return (
        <VStack>
            <Input
                defaultValue={title}
                placeholder="title"
                color="font.100"
                borderColor="font.100"
                onChange={onChangeTitle}
                isDisabled={isLoading}
            ></Input>
            <Stack direction="row" w="100%">
                {due ? (
                    <Input
                        type="date"
                        defaultValue={due}
                        color="font.100"
                        borderColor="font.100"
                        onChange={onChangeDue}
                        isDisabled={isLoading}
                    ></Input>
                ) : (
                    <Input
                        type="date"
                        defaultValue={today.toString()}
                        color="font.100"
                        borderColor="font.100"
                        className="icon-del"
                        onChange={onChangeDue}
                        isDisabled={isLoading}
                    ></Input>
                )}
                <Select
                    defaultValue={priority}
                    onChange={onChangePriority}
                    color="font.100"
                    borderColor="font.100"
                    isDisabled={isLoading}
                >
                    <option value="high">High</option>
                    <option value="middle">Middle</option>
                    <option value="low">Low</option>
                </Select>
            </Stack>
            <Textarea
                h="120px"
                placeholder="description"
                defaultValue={description}
                color="font.100"
                borderColor="font.100"
                onChange={onChangeDescription}
                isDisabled={isLoading}
            />
        </VStack>
    );
});
