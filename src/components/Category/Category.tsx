import React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import styles from './Category.module.css';
const AVAILABLE_CATEGORIES = [
  'All',
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
] as const;

export type CategoryType = (typeof AVAILABLE_CATEGORIES)[number];

type Props = {
  currentCategory: CategoryType;
  setCategory: Dispatch<SetStateAction<CategoryType>>;
};

const Category = React.forwardRef<HTMLDivElement, Props>(
  ({ currentCategory, setCategory }, ref) => {
    const handleCategoryChange = (category: CategoryType) => {
      setCategory(category);
    };
    return (
      <div className={styles.items} ref={ref}>
        {AVAILABLE_CATEGORIES.map((category, index) => (
          <button
            className={`${styles.btn} ${currentCategory === category ? styles.btn_current : ''}`}
            onClick={() => handleCategoryChange(category)}
            key={index}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }
);

export default Category;
