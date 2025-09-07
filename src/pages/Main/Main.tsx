import { useEffect, useState } from 'react';
import { apiGetnews } from '../../api/apiNews';
import styles from './Main.module.css';
import BannerWithSkeleton from '../../components/Banner/Banner';
import NewsListWSkeleton from '../../components/News/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Category, {
  type CategoryType,
} from '../../components/Category/Category';
import Search from '../../components/Search/Search';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFetch } from '../../helpers/hooks/useFetch';

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<CategoryType>('All');
  const [searchKw, setSearchKw] = useState('');

  const debouncedKw = useDebounce<string>(searchKw, 1500);

  const { news, error, isLoading, totalPages } = useFetch(apiGetnews, {
    page: currentPage,
    category: category === 'All' ? undefined : category,
    q: debouncedKw,
  });

  useEffect(() => {}, [currentPage, category, searchKw]);
  return (
    <main className={styles.news}>
      <Category currentCategory={category} setCategory={setCategory} />
      <Search searchKw={searchKw} setSearchKw={setSearchKw} />
      <BannerWithSkeleton
        isLoading={isLoading}
        item={news.length > 0 ? news[0] : undefined}
      />
      <section className={styles.news}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <NewsListWSkeleton
          isLoading={isLoading}
          news={news.length > 0 ? news : undefined}
        />
      </section>
      {!error && news.length <= 0 && (
        <div className={styles.emptyNewsMessage}>
          <h2 className={styles.message}>
            Unfortunately there is no one news, you can try change category or
            Searching parametre
          </h2>
        </div>
      )}
    </main>
  );
};

export default Main;
