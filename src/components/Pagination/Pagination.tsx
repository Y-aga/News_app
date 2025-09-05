import styles from './Pagination.module.css';
type Props = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const Pagination = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  const countPage =
    totalPages % 10 === 0 ? totalPages / 10 : Math.trunc(totalPages / 10) + 1;

  const nextPage = () => {
    setCurrentPage((prev) => {
      if (prev >= totalPages) return prev;
      return prev + 1;
    });
  };
  const previosPage = () => {
    setCurrentPage((prev) => {
      if (prev <= 1) return prev;
      return prev - 1;
    });
  };
  return (
    <div className={styles.pagination}>
      <button
        onClick={previosPage}
        disabled={currentPage === 1}
        className={`${styles.btn} ${styles.btn_arrow}`}
      >
        {'<'}
      </button>
      <div className={styles.pages}>
        {[...Array(countPage)].map((_, index) => (
          <button
            className={`${styles.btn} ${currentPage === index + 1 ? styles.btn_pageCurrent : ''}`}
            disabled={currentPage === index + 1}
            onClick={() => {
              setCurrentPage(index + 1);
            }}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={nextPage}
        disabled={currentPage >= totalPages}
        className={`${styles.btn} ${styles.btn_arrow}`}
      >
        {'>'}
      </button>
    </div>
  );
};
export default Pagination;
