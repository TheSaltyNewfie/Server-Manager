import { Modal, ModalContent } from "@nextui-org/modal";

export default function CustomModal({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {children}
            </ModalContent>
        </Modal>
    )
}