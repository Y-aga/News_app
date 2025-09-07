import { useCallback, useEffect, useState } from 'react';
import { apiGetnews, type Article } from '../../api/apiNews';
import styles from './Main.module.css';
import BannerWithSkeleton from '../../components/Banner/Banner';
import NewsListWSkeleton from '../../components/News/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Category, {
  type CategoryType,
} from '../../components/Category/Category';
import Search from '../../components/Search/Search';
import { useDebounce } from '../../helpers/hooks/useDebounce';

const Main = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [news, setNews] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState<CategoryType>('All');
  const [searchKw, setSearchKw] = useState('');

  const debouncedKw = useDebounce<string>(searchKw, 1500);
  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const news = await apiGetnews({
        page: currentPage,
        category: category === 'All' ? undefined : category,
        q: debouncedKw,
      });
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
  }, [currentPage, totalPages, category, debouncedKw]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  return (
    <main className={styles.news}>
      <Category currentCategory={category} setCategory={setCategory} />
      <Search searchKw={searchKw} setSearchKw={setSearchKw} />
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
      {!error && news.length <= 0 && (
        <div className={styles.emptyNewsMessage}>
          <h2 className={styles.message}>
            Unfortunately there is no one news, you kan try change category or
            Searching parametre
          </h2>
        </div>
      )}
    </main>
  );
};

export default Main;
