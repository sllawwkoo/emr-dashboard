import { ArrowLeftIcon, ArrowRightIcon } from "@/layout/components/Icons";
import styles from "./Pagination.module.scss";

/**
 * Pagination — універсальний компонент пагінації.
 * Props: currentPage, totalPages, onPageChange(page)
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  const page = Number(currentPage) || 1;
  const total = Number(totalPages) || 1;
  const isFirstPage = page <= 1;
  const isLastPage = page >= total;

  const handlePrev = (e) => {
    e.preventDefault();
    if (!isFirstPage && onPageChange) onPageChange(page - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!isLastPage && onPageChange) onPageChange(page + 1);
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        disabled={isFirstPage}
        onClick={handlePrev}
        aria-label="Попередня сторінка"
      >
        <ArrowLeftIcon size={18} />
        Попередня
      </button>

      <span className={styles.label}>
        Сторінка {page} з {total}
      </span>

      <button
        type="button"
        className={styles.button}
        disabled={isLastPage}
        onClick={handleNext}
        aria-label="Наступна сторінка"
      >
        Наступна
        <ArrowRightIcon size={18} />
      </button>
    </div>
  );
}

export default Pagination;
