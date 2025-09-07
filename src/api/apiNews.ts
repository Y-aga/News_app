import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export type Options = {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
};
export type News = {
  status: string;
  totalResults: number;
  articles: Article[];
};
type ArticleSource = {
  id: string | null; // id может быть null, если отсутствует
  name: string;
};
export type Article = {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | undefined;
  publishedAt: string;
  content: string | null;
};
export const apiGetnews = async (options: Options): Promise<News> => {
  try {
    const response = await axios.get<News>(`${BASE_URL}/news?`, {
      params: {
        pageSize: 10,
        ...options,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Произошла неизвестная ошибка');
    }
  }
};
