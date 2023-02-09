import { Icon } from "@chakra-ui/react";
import {
    AiFillDelete,
    AiFillHome,
    AiFillSetting,
    AiOutlineCheck,
    AiOutlineFile,
    AiOutlineMessage,
    AiOutlinePlus,
    AiOutlineProfile,
    AiOutlineSchedule,
    AiOutlineSend,
    AiOutlineUnorderedList,
} from "react-icons/ai";

export const iconManager = {
    check: <Icon as={AiOutlineCheck} />,
    home: <Icon as={AiFillHome} />,
    task: <Icon as={AiOutlineUnorderedList} />,
    gantt: <Icon as={AiOutlineSchedule} />,
    chat: <Icon as={AiOutlineMessage} />,
    setting: <Icon as={AiFillSetting} />,
    add: <Icon as={AiOutlinePlus} />,
    update: <Icon as={AiOutlineFile} />,
    delete: <Icon as={AiFillDelete} />,
    send: <Icon as={AiOutlineSend} />,
    csv: <Icon as={AiOutlineProfile} />,
};
