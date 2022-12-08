import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { chatMessageAtom } from "../recoil/chatMessage";

export const OperationChatForm = () => {
    const [message, setMessage] = useRecoilState(chatMessageAtom);
    const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage((oldMessage) => {
            return { ...oldMessage, content: e.target.value };
        });
    };
    return { onChangeContent };
};
