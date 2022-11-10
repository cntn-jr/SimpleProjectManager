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
    useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, memo } from "react";
import { useRecoilState } from "recoil";
import { Task } from "../../../types/task";
import { editTasksAtom } from "../../../recoil/editTasksAtom";
import { TaskEditButtons } from "./TaskEditButtons";
import { loadingAtom } from "../../../recoil/loadingAtom";
import { TaskEditModal } from "./TaskEditModal";
import { editTaskAtom } from "../../../recoil/editTaskAtom";
import { TaskTableBody } from "../../molecules/TaskTableBody";
import { TaskTableHead } from "../../molecules/TaskTableHead";

type Props = {
    tasks: Array<Task>;
    isCheckbox: boolean;
    mt: string;
    hTable: string;
    hBody: string;
    isEdit: boolean;
};

export const TasksTable = memo((props: Props) => {
    const { tasks, isCheckbox, mt, hTable, hBody, isEdit } = props;
    const [editTasks, setEditTasks] = useRecoilState(editTasksAtom);
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editTask, setEditTask] = useRecoilState(editTaskAtom);
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
    const onClickTr = (task: Task) => {
        setEditTask((oldEditTask) => {
            return task;
        });
        onOpen();
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
                        <TaskTableHead />
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
                        <TaskTableBody
                            tasks={tasks}
                            isCheckbox={isCheckbox}
                            onChangeCheckbox={onChangeCheckbox}
                            loading={loading}
                            onClickTr={onClickTr}
                        />
                    </Tbody>
                </Table>
            </TableContainer>
            <TaskEditButtons
                editTasks={editTasks}
                setEditTasks={setEditTasks}
            />
            {isEdit ? (
                <TaskEditModal isOpen={isOpen} onClose={onClose} />
            ) : (
                <></>
            )}
        </>
    );
});
