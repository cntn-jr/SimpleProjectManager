import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
} from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { loadingAtom } from "../../recoil/loadingAtom";
import { CancelButton } from "../atomic/buttons/CancelButton";
import { DeleteButton } from "../atomic/buttons/DeleteButton";

type Props = {
    onClick: () => void;
    isOpen: boolean;
    onClose: () => void;
};

export const DeleteModal = memo((props: Props) => {
    const { onClick, isOpen, onClose } = props;
    const [loading] = useRecoilState(loadingAtom);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent bgColor="sub.1">
                    <ModalHeader color="font.100">
                        Delete Confirmation
                    </ModalHeader>
                    <ModalBody color="font.50">
                        Do you really want to delete it? Once deleted, it connot
                        be undone.
                    </ModalBody>

                    <ModalFooter>
                        <Stack direction="row">
                            <DeleteButton
                                onClick={onClick}
                                size="sm"
                                isDisabled={false}
                                isLoading={loading}
                            />
                            <CancelButton
                                onClick={onClose}
                                size="sm"
                                isDisabled={loading}
                            />
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
});
