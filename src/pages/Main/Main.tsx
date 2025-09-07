import { useState } from 'react';
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
import Empty from '../../components/Empty/Empty';

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<CategoryType>('All');
  const [searchKw, setSearchKw] = useState('');

  const debouncedKw = useDebounce<string>(searchKw, 1500);
  const { error, isLoading, news, totalPages } = useFetch(apiGetnews, {
    page: currentPage,
    category: category === 'All' ? undefined : category,
    q: debouncedKw,
  });

  return (
    <main className={styles.news}>
      <Category currentCategory={category} setCategory={setCategory} />
      <Search searchKw={searchKw} setSearchKw={setSearchKw} />
      {!error && news.length > 0 && (
        <BannerWithSkeleton isLoading={isLoading} item={news[0]} />
      )}
      {!error && news.length > 0 && (
        <section className={styles.news}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NewsListWSkeleton isLoading={isLoading} news={news} />
        </section>
      )}
      {!error && news.length <= 0 && <Empty />}
    </main>
  );
};

export default Main;
