import { useEffect, useState } from 'react';
import type { Article, News, Options } from '../../api/apiNews';

export function useFetch(
  fetchFunction: (options: Options) => Promise<News>,
  options: Options
) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [news, setNews] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const stringParams = options
    ? new URLSearchParams(options as Record<string, string>).toString()
    : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await fetchFunction(options);
        setTotalPages(news.totalResults);
        setNews(news.articles);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      } finally {
        setIsloading(false);
      }
    };
    fetchData();
  }, [fetchFunction, stringParams]);
  return { error, isLoading, news, totalPages };
}
