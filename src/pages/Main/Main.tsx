import { useCallback, useEffect, useState } from 'react';
import { apiGetnews, type Article } from '../../api/apiNews';
import styles from './Main.module.css';
import BannerWithSkeleton from '../../components/Banner/Banner';
import NewsListWSkeleton from '../../components/News/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const news = await apiGetnews({ page: currentPage });
      if (news.totalResults !== totalPages) {
        setTotalPages(news.totalResults);
      }
      setNews(news.articles);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  return (
    <main className="main">
      {!error && news.length > 0 && (
        <BannerWithSkeleton isLoading={loading} item={news[0]} />
      )}
      {!error && news.length > 0 && (
        <section className={styles.news}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NewsListWSkeleton isLoading={loading} news={news} />
        </section>
      )}
    </main>
  );
};

export default Main;
