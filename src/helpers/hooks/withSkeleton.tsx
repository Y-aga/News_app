import Skeleton from '../../components/skeleton/Skeleton';

type Stylename = 'banner' | 'newsItem';
type PropsWithKey<T> = T & { key?: React.Key };

export function withSkeleton<T>(
  Component: React.ComponentType<T>,
  count: number,
  type: Stylename
) {
  return function withSkeleton(props: T & { isLoading: boolean }) {
    const { isLoading, ...restProps } = props;
    if (isLoading) {
      return <Skeleton count={count} type={type} />;
    }
    return <Component {...(restProps as PropsWithKey<T>)} />;
  };
}
