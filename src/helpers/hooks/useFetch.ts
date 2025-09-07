import { type Options } from './../../api/apiNews';
import { useEffect, useState } from 'react';
import type { Article, News } from '../../api/apiNews';

type fetchFunctionType = (options: Options) => Promise<News>;
type Result = {
  news: Article[];
  error: string | null;
  isLoading: boolean;
  totalPages: number;
};
export const useFetch = (
  fetchFunction: fetchFunctionType,
  options: Options
): Result => {
  const [news, setNews] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const stringOptions = options
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
  }, [fetchFunction, stringOptions]);

  return { news, error, isLoading, totalPages };
};
