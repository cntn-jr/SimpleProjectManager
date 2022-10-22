import {
    Badge,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { memo } from "react";
import { Task } from "../../types/task";

type Props = {
    tasks: Array<Task>;
};

export const TasksTable = memo((props: Props) => {
    const { tasks } = props;
    return (
        <TableContainer m="0" w="100%">
            <Table variant="simple" bgColor="main.2.100" border="main.1">
                <Thead>
                    <Tr>
                        <Th color="font.100" w="60%">
                            Title
                        </Th>
                        <Th color="font.100" w="20%">
                            Due
                        </Th>
                        <Th color="font.100" w="20%">
                            Priority
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map((task) => (
                        <Tr key={task.id}>
                            <Td>
                                <Text noOfLines={1}>{task.title}</Text>
                            </Td>
                            <Td>{task.due}</Td>
                            <Td>
                                <Badge bgColor={task.priority} color="font.100">
                                    {task.priority}
                                </Badge>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
});
