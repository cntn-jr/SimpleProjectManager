import {
    Badge,
    Checkbox,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";
import { Task } from "../../types/task";
import { editTasksAtom } from "../../recoil/editTasksAtom";
import { TaskEditButtons } from "../organisms/task/TaskEditButtons";
import { loadingAtom } from "../../recoil/isLoadingAtom";

type Props = {
    tasks: Array<Task>;
    isCheckbox: boolean;
    mt: string;
    hTable: string;
    hBody: string;
};

export const TasksTable = memo((props: Props) => {
    const { tasks, isCheckbox, mt, hTable, hBody } = props;
    const [editTasks, setEditTasks] = useRecoilState(editTasksAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const task_id = e.target.value;
        const workEditTasks = [...editTasks];
        if (
            workEditTasks.find((editTaskId) => {
                return editTaskId === task_id;
            })
        ) {
            setEditTasks((newEditTasks) => {
                return [...newEditTasks].filter((editTaskId) => {
                    return editTaskId !== task_id;
                });
            });
        } else {
            setEditTasks((newEditTasks) => {
                return [...newEditTasks, task_id];
            });
        }
    };
    return (
        <>
            <TableContainer
                m="0"
                w={{
                    sm: "330px",
                    md: "610px",
                    lg: "800px",
                    xl: "1000px",
                    "2xl": "1200px",
                }}
                h={hTable}
                mt={mt}
                position="fixed"
            >
                <Table variant="simple" bgColor="main.2.100" border="main.1">
                    <Thead h="40px">
                        <Tr>
                            <Th
                                color="font.100"
                                minW="40px"
                                maxW="40px"
                                w="40px"
                                p="0"
                            >
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
                    </Thead>
                    <Tbody
                        overflowY="scroll"
                        color="font.100"
                        borderColor="font.100"
                        bgColor="main.2.100"
                        position="absolute"
                        w={{
                            sm: "330px",
                            md: "610px",
                            lg: "800px",
                            xl: "1000px",
                            "2xl": "1200px",
                        }}
                        h={hBody}
                    >
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
                    </Tbody>
                </Table>
            </TableContainer>
            <TaskEditButtons
                editTasks={editTasks}
                setEditTasks={setEditTasks}
            />
        </>
    );
});
