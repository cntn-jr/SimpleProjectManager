import { Chat } from "./components/pages/Chat";
import { Gantt } from "./components/pages/Gantt";
import { Home } from "./components/pages/Home";
import { Task } from "./components/pages/Task";
import { iconManager } from "./icon";

export const MenuList = [
    { menuName: "home", icon: iconManager.home, children: <Home /> },
    { menuName: "task", icon: iconManager.task, children: <Task /> },
    { menuName: "gantt", icon: iconManager.gantt, children: <Gantt /> },
    { menuName: "chat", icon: iconManager.chat, children: <Chat /> },
];
