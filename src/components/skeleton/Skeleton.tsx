import styles from './Skeleton.module.css';
import type { FC } from 'react';

type StyleName = 'banner' | 'newsItem';
export type SkeletonProps = {
  count: number;
  type: StyleName;
};
const Skeleton: FC<SkeletonProps> = ({ count = 1, type }) => {
  return (
    <>
      {count > 1 ? (
        <div className={styles.newsList}>
          {[...Array(count)].map((_, index) => (
            <li key={index} className={styles[type]}></li>
          ))}
        </div>
      ) : (
        <li className={styles.banner}></li>
      )}
    </>
  );
};

export default Skeleton;
