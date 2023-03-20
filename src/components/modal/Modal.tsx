import React, { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import styles from "./Modal.module.css";

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: FC<IModalProps> = ({ onClose, children, title }) => {
  const modalRoot = document.getElementById("modalRoot") as HTMLElement;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <p className="text text_type_main-large">{title}</p>}
          <button className={styles.button} onClick={onClose}>
            <CloseIcon type={"primary"} />
          </button>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
