import { Chat } from "./components/pages/Chat";
import { Gantt } from "./components/pages/Gantt";
import { Home } from "./components/pages/Home";
import { TaskPage } from "./components/pages/TaskPage";
import { iconManager } from "./icon";

export const MenuList = [
    { menuName: "home", icon: iconManager.home, children: <Home /> },
    { menuName: "task", icon: iconManager.task, children: <TaskPage /> },
    { menuName: "gantt", icon: iconManager.gantt, children: <Gantt /> },
    { menuName: "chat", icon: iconManager.chat, children: <Chat /> },
];
