import { type FC } from 'react';

import styles from './Image.module.css';
type ImageProps = {
  img: string | undefined;
};

const ImageBanner: FC<ImageProps> = ({ img }) => {
  return (
    <div className={styles.wrapper}>
      {img ? <img src={img} className={styles.img} /> : null}
    </div>
  );
};

export default ImageBanner;
