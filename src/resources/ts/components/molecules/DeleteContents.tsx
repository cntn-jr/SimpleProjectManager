import { useDisclosure } from "@chakra-ui/react";
import { DeleteButton } from "../atomic/buttons/DeleteButton";
import { DeleteModal } from "./DeleteModal";

type Props = {
    loading: boolean;
    onClickDelete: () => void;
};

export const DeleteContents = (props: Props) => {
    const { loading, onClickDelete } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <DeleteButton
                size="sm"
                isLoading={false}
                isDisabled={loading}
                onClick={onOpen}
            />
            <DeleteModal
                onClick={onClickDelete}
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};
