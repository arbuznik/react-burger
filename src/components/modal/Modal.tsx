import React, { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import styles from "./Modal.module.css";
import clsx from "clsx";

interface IModalProps {
  onClose: () => void;
  children: ReactNode;
  title?: string | number;
}

const Modal: FC<IModalProps> = ({ onClose, children, title }) => {
  const modalRoot = document.getElementById("modalRoot") as HTMLElement;
  const renderTitle = typeof title === "number" ? `#${title}` : title;

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

  const titleClassNames = clsx("text", {
    "text_type_main-large": typeof title === "string",
    "text_type_digits-default": typeof title === "number",
  });

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.header}>
          {renderTitle && <p className={titleClassNames}>{renderTitle}</p>}
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
