import React from "react";
import "./styles.css";
const Modal: React.FC<IModalProps> = ({
  show,
  close,
  children,
}: IModalProps) => {
  if (!show) return null;
  return (
    <div className="overlay">
      <div className="modal-container">{children}</div>
    </div>
  );
};

export default Modal;
