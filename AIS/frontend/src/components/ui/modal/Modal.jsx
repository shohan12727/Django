/**
 * Modal Component - Base UI Component
 * 
 * Reusable modal/dialog component for alerts, confirmations, and forms.
 */

import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, children, size = 'md', hideCloseButton = false }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles[`modal-${size}`]} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{title}</h2>
          {!hideCloseButton && (
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
          )}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
