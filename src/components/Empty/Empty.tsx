import styles from './Empty.module.css';
const Empty = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.message}>
        Unfortunately there is no one news, you can try change category or
        Searching parametre
      </h2>
    </div>
  );
};

export default Empty;
