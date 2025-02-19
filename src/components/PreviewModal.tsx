import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from 'react';

interface PreviewModalProps {
    isOpen: boolean;
    onClose: (i: number) => void;
    children: React.ReactNode;
    giftRef: React.RefObject<HTMLDivElement>
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, children, giftRef }) => {
    const [modalHeight, setModalHeight] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const updateModalHeight = () => {
        if (giftRef.current) {
            const { top } = giftRef.current.getBoundingClientRect();
            setModalHeight(top - 20); // Stop 20px above the gift element
        }
    };

    useEffect(() => {
        // Update on scroll and resize
        window.addEventListener('scroll', updateModalHeight);
        window.addEventListener('resize', updateModalHeight);

        // Initial calculation
        updateModalHeight();

        let rafId: number;

        // Function to continuously update during the transition
        const updateDuringTransition = () => {
            updateModalHeight();
            rafId = requestAnimationFrame(updateDuringTransition);
        };

        const handleTransitionStart = () => {
            // Start continuously updating modal height when the transition starts
            rafId = requestAnimationFrame(updateDuringTransition);
        };

        const handleTransitionEnd = () => {
            // Stop the continuous update once the transition is complete
            cancelAnimationFrame(rafId);
            updateModalHeight(); // Ensure the final position is applied
        };

        // Attach event listeners to the gift element for CSS transitions
        const giftElement = giftRef.current;
        if (giftElement) {
            giftElement.addEventListener('transitionstart', handleTransitionStart);
            giftElement.addEventListener('transitionend', handleTransitionEnd);
        }

        return () => {
            window.removeEventListener('scroll', updateModalHeight);
            window.removeEventListener('resize', updateModalHeight);
            if (giftElement) {
                giftElement.removeEventListener('transitionstart', handleTransitionStart);
                giftElement.removeEventListener('transitionend', handleTransitionEnd);
            }
            cancelAnimationFrame(rafId);
        };
    }, [giftRef]);

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

    useEffect(() => {
        if (modalRef.current) {
            const { width, height } = modalRef.current.getBoundingClientRect();
            if (width / height > 1.4) {
                setHeight(height);
                setWidth(height * 1.4);
            } else {
                setHeight(width / 1.4);
                setWidth(width);
            }

        }
    }, [modalHeight]);


    if (!isOpen) return null;

    const getHeight = () => {
        if (width < 700) {
            return height;
        } else {
            return 500
        }
    }

    const getWidth = () => {
        if (width < 700) {
            return width;
        } else {
            return 700
        }
    }

    return createPortal(
        <div
            ref={modalRef}
            id="preview-modal"
            className="fixed inset-0 flex items-end justify-center z-[600] bg-slate-300 bg-opacity-30 backdrop-filter backdrop-blur-lg overflow-hidden md:pb-5 md:pr-5 md:pl-5"
            style={{ height: modalHeight, width: "100%" }}
        >
            <div
                id="preview-bg"
                className="relative w-full md:p-5 box-border flex "
                style={{
                    height: height,
                    width: width,
                }}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300"
                >
                    <div>X</div>
                </button>
                <div id="preview"
                    className="bg-white"
                    style={{
                        height: getHeight(),
                        width: getWidth(),
                        transform: `scale(${height / 500 * 0.8})`,
                        margin: "auto",
                    }}
                >{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default PreviewModal;
