import styles from './Header.module.css';
import { transformDate } from '../../helpers/transformDate';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>UpdateHub News</h1>
      <p className={styles.date}>{transformDate(new Date())}</p>
    </header>
  );
};

export default Header;
