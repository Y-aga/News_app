import type { Dispatch, SetStateAction } from 'react';
import styles from './Category.module.css';
const AVAlIBLE_CATEGORIES = [
  'All',
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
] as const;

export type CategoryType = (typeof AVAlIBLE_CATEGORIES)[number];
type Props = {
  currentCategory: CategoryType;
  setCategory: Dispatch<SetStateAction<CategoryType>>;
};
const Category = ({ currentCategory, setCategory }: Props) => {
  const changeCategory = (category: CategoryType) => {
    setCategory(category);
  };
  return (
    <div className={styles.category}>
      <button className={`${styles.btn} ${styles.btn_arrow}`}>{'<'}</button>
      <div className={styles.items}>
        {AVAlIBLE_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              changeCategory(category);
            }}
            className={`${styles.btn} ${currentCategory === category ? styles.btn_current : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
      <button className={`${styles.btn} ${styles.btn_arrow}`}>{'>'}</button>
    </div>
  );
};

export default Category;
