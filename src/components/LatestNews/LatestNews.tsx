import styles from './LatestNews.module.css';
import { useFetch } from '../../helpers/hooks/useFetch';
import { getLatestNews } from '../../api/apiNews';
import BannerWSkeleton from '../Banner/Banner';

const LatestNews = () => {
  const { error, isLoading, news } = useFetch(getLatestNews, {});
  return (
    <section className={styles.latestNews}>
      <h2 className={styles.title}>Tech and Latest WebTech</h2>
      {!error && (
        <div className={styles.news}>
          {news.map((item, index) => (
            <BannerWSkeleton key={index} item={item} isLoading={isLoading} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestNews;
