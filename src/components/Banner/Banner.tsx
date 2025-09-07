import styles from './Banner.module.css';
import type { Article } from '../../api/apiNews';
import ImageBanner from '../Image/Image';
import { timeAgo } from '../../helpers/timeAgo';
import { withSkeleton } from '../../helpers/hoks/withSkeleton';

type Props = {
  item: Article;
};

const Banner = ({ item }: Props) => {
  return (
    <section className={styles.banner}>
      <ImageBanner img={item.urlToImage} />
      <h2 className={styles.title}>{item.title}</h2>
      <p className={styles.timeAuthor}>
        {timeAgo(item.publishedAt)} &bull; by {item.author}
      </p>
    </section>
  );
};

const BannerWSkeleton = withSkeleton<Props>(Banner, 1, 'banner');
export default BannerWSkeleton;
