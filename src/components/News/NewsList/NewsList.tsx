import { type FC } from 'react';
import type { Article } from '../../../api/apiNews';
import styles from './NewsList.module.css';
import NewsItem from '../NewsItem/NewsItem';
import { withSkeleton } from '../../../helpers/hoks/withSkeleton';

type Props = {
  news: Article[];
};
const NewsList: FC<Props> = ({ news }) => {
  return (
    <div className={styles.newsList}>
      {news.map((item, index) => (
        <li key={index} className={styles.newsItem}>
          <NewsItem newsItem={item} />
        </li>
      ))}
    </div>
  );
};

const NewsWSkeleton = withSkeleton<Props>(NewsList, 4, 'newsItem');
export default NewsWSkeleton;
