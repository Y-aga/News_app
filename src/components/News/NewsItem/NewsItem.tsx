import { type FC } from 'react';

import styles from './News.module.css';
import type { Article } from '../../../api/apiNews';
import { timeAgo } from '../../../helpers/timeAgo';
type Props = {
  newsItem: Article;
};
const NewsItem: FC<Props> = ({ newsItem }) => {
  return (
    <>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${newsItem.urlToImage})` }}
      ></div>
      <div className={styles.info}>
        <h2 className={styles.title}>{newsItem.title}</h2>
        <p className={styles.timeAuthor}>
          {timeAgo(newsItem.publishedAt)} &bull; by {newsItem.author}
        </p>
      </div>
    </>
  );
};

export default NewsItem;
