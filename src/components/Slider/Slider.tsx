import React from 'react';
import { useRef } from 'react';
import styles from './Slider.module.css';

type SliderProps = {
  children: React.ReactElement<React.RefAttributes<HTMLDivElement>>;
};
const Slider: React.FC<SliderProps> = ({ children }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const prevHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 150;
    }
  };
  const nextHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 150;
    }
  };
  return (
    <div className={styles.slider}>
      <button onClick={prevHandler} className={styles.btn_arrow}>
        {'<'}
      </button>
      {React.cloneElement(children, { ref: sliderRef })}
      <button onClick={nextHandler} className={styles.btn_arrow}>
        {'>'}
      </button>
    </div>
  );
};

export default Slider;
