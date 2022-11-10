import { Badge, Checkbox, Td, Text, Tr } from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";
import { Task } from "../../types/task";

type Props = {
    tasks: Array<Task>;
    isCheckbox: boolean;
    onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    onClickTr: (task: Task) => void;
};

export const TaskTableBody = memo((props: Props) => {
    const { tasks, isCheckbox, onChangeCheckbox, loading, onClickTr } = props;
    return (
        <>
            {tasks.map((task) => (
                <Tr
                    key={task.id}
                    w={{
                        sm: "330px",
                        md: "610px",
                        lg: "800px",
                        xl: "1000px",
                        "2xl": "1200px",
                    }}
                    h="55px"
                >
                    <Td minW="40px" maxW="40px" p="0" pl="10px">
                        {isCheckbox ? (
                            <Checkbox
                                value={task.id}
                                onChange={onChangeCheckbox}
                                isDisabled={loading}
                            />
                        ) : (
                            <></>
                        )}
                    </Td>

                    <Td
                        w={{
                            sm: "90px",
                            md: "300px",
                            lg: "400px",
                            xl: "500px",
                            "2xl": "600px",
                        }}
                        px="0"
                        onClick={() => onClickTr(task)}
                        cursor="pointer"
                    >
                        <Text
                            noOfLines={1}
                            px="0"
                            w={{
                                sm: "90px",
                                md: "300px",
                                lg: "400px",
                                xl: "500px",
                                "2xl": "600px",
                            }}
                        >
                            {task.title}
                        </Text>
                    </Td>
                    <Td
                        w={{
                            sm: "80px",
                            md: "150px",
                            lg: "200px",
                            xl: "250px",
                            "2xl": "300px",
                        }}
                        px={{ sm: "0" }}
                        textAlign="center"
                        onClick={() => onClickTr(task)}
                        cursor="pointer"
                    >
                        {task.due}
                    </Td>
                    <Td
                        px={{ sm: "0" }}
                        w={{
                            sm: "120px",
                            md: "120px",
                            lg: "160px",
                            xl: "210px",
                            "2xl": "260px",
                        }}
                        textAlign="center"
                        onClick={() => onClickTr(task)}
                        cursor="pointer"
                    >
                        <Badge
                            bgColor={task.priority}
                            color="font.100"
                            w="60px"
                        >
                            {task.priority}
                        </Badge>
                    </Td>
                </Tr>
            ))}
        </>
    );
});
