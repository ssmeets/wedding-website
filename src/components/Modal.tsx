import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: (i: number) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const closeModal = () => {
        onClose(-1);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-[500]">
            <div className="bg-white shadow-lg p-6 max-w-xl w-full relative">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300"
                >
                    <div>X</div>
                </button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
