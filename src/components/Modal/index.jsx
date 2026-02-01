import { useEffect } from "react";
import styles from "./Modal.module.scss";

/**
 * Modal — універсальний компонент для підтвердження (наприклад видалення).
 * Відповідає тільки за UI + Confirm/Cancel. Бізнес-логіка у батьківському компоненті.
 *
 * Props:
 * - open      — чи модал відкритий
 * - onClose   — закрити (Cancel, overlay, ESC)
 * - onConfirm — підтвердити (Confirm)
 * - title     — заголовок
 * - children  — контент (текст підтвердження)
 */
function Modal({ open, onClose, onConfirm, title, children }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div className={styles.content}>
        {title && (
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
        )}
        {children && <div className={styles.body}>{children}</div>}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={onClose}
          >
            Скасувати
          </button>
          <button
            type="button"
            className={styles.confirm}
            onClick={onConfirm}
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
