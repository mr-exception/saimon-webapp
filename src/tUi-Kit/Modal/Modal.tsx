import React from "react";
import "./styles.css";
const Modal: React.FC<IModalProps> = ({
  show,
  close,
  children,
}: IModalProps) => {
  if (!show) return null;
  return (
    <div className="overlay" onClick={close}>
      <div
        className="modal-container border-0 rounded-lg"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
