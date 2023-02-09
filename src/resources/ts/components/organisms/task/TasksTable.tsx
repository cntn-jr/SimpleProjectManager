import {
    Table,
    TableContainer,
    Tbody,
    Thead,
    useDisclosure,
} from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { Task } from "../../../types/task";
import { TaskEditButtons } from "./TaskEditButtons";
import { loadingAtom } from "../../../recoil/loadingAtom";
import { TaskEditModal } from "./TaskEditModal";
import { TaskTableBody } from "../../molecules/TaskTableBody";
import { TaskTableHead } from "../../molecules/TaskTableHead";
import { taskAtom } from "../../../recoil/taskAtom";
import { OperationTaskForm } from "../../../OperationForm/OperationTaskForm";

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
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [task, setTask] = useRecoilState(taskAtom);
    const { onChangeCheckbox } = OperationTaskForm();

    const onClickTr = (task: Task) => {
        setTask(() => {
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
                        maxH={hBody}
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
            <TaskEditButtons />
            {isEdit ? (
                <TaskEditModal isOpen={isOpen} onClose={onClose} />
            ) : (
                <></>
            )}
        </>
    );
});
