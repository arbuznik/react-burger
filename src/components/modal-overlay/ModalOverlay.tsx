import React, { FC } from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
  onClick: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;
