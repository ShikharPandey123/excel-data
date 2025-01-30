import React from "react";
import styles from "./ErrorModal.module.css";

interface ErrorModalProps {
  errors: { row: number; message: string }[];
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errors, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Validation Errors</h2>
        <ul className={styles.errorList}>
          {errors.map((error, index) => (
            <li key={index} className={styles.errorItem}>
              Row {error.row}: {error.message}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
