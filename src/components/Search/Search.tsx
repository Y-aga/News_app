import React, { type Dispatch, type SetStateAction } from 'react';

import styles from './Search.module.css';

type Props = {
  searchKw: string;
  setSearchKw: Dispatch<SetStateAction<string>>;
};
const Search = ({ searchKw, setSearchKw }: Props) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKw(e.target.value);
  };
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        placeholder="Search..."
        type="text"
        value={searchKw}
        onChange={changeHandler}
      />
    </div>
  );
};

export default Search;
