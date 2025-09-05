import React from "react";

interface ModalProps {
	children?: React.ReactNode;
	open?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open = false }) => {
	if (!open) return null;
	return <div className="modal">{children}</div>;
};

export default Modal;
