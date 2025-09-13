import { useState } from 'react';
import Category, { type CategoryType } from '../Category/Category';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import Empty from '../Empty/Empty';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFetch } from '../../helpers/hooks/useFetch';
import { apiGetnews } from '../../api/apiNews';
import styles from './NewsFilter.module.css';
import NewsWSkeleton from '../News/NewsList/NewsList';
import Slider from '../Slider/Slider';
const NewsFilter = () => {
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
    <section className={styles.newsFilter}>
      <Slider>
        <Category currentCategory={category} setCategory={setCategory} />
      </Slider>
      <Search searchKw={searchKw} setSearchKw={setSearchKw} />
      {!error && news.length > 0 && (
        <div className={styles.news}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <NewsWSkeleton isLoading={isLoading} news={news} />
        </div>
      )}
      {!error && news.length <= 0 && <Empty />}
    </section>
  );
};

export default NewsFilter;
