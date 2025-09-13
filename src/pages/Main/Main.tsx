import styles from './Main.module.css';
import LatestNews from '../../components/LatestNews/LatestNews';
import NewsFilter from '../../components/NewsFilter/NewsFilter';
const Main = () => {
  return (
    <main className={styles.news}>
      <NewsFilter />
      <LatestNews />
    </main>
  );
};

export default Main;
