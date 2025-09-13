import { type FC } from 'react';

import styles from './Image.module.css';
type ImageProps = {
  img: string | undefined;
  url: string | undefined;
};

const ImageBanner: FC<ImageProps> = ({ img, url }) => {
  return (
    <a
      href={url}
      target="_blanck"
      rel="noopener noreferrer"
      className={styles.wrapper}
    >
      {img ? <img src={img} className={styles.img} /> : null}
    </a>
  );
};

export default ImageBanner;
