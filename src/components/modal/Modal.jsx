import React, { useEffect } from 'react';
import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/ModalOverlay";
import PropTypes from "prop-types";
import styles from './Modal.module.css';

const Modal = ({ onClose, children, title }) => {
    const modalRoot = document.getElementById('modalRoot');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    return createPortal(
        (
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
            </>
        ),
        modalRoot
    );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
}

export default Modal;