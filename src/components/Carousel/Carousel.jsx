import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import style from './style/carousel.module.sass';
import ModalCheeseWindow from "../ModalCheeseWindow/ModalCheeseWindow";
import cheeseData from '../../json/cheeses.json';

const Carousel = ({ direction }) => {
  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const requestIdRef = useRef(null);
  const startPositionRef = useRef(0);
  const [selectedCheese, setSelectedCheese] = useState(null);

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const closeModal = () => {
    setSelectedCheese(null);
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    const animate = () => {
      if (!isHovered) {
        startPositionRef.current += direction === 'left' ? -0.3 : 0.3;

        if (startPositionRef.current >= carousel.scrollWidth / 2) {
          startPositionRef.current = 0;
        } else if (startPositionRef.current <= 0) {
          startPositionRef.current = carousel.scrollWidth / 2;
        }

        carousel.scrollLeft = startPositionRef.current;
      }

      requestIdRef.current = requestAnimationFrame(animate);
    };

    requestIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestIdRef.current);
  }, [direction, isHovered]);

  const handleImageClick = (cheese) => {
    setSelectedCheese({
      ...cheese,
      title: lang === 'en' ? cheese.title_en || cheese.title : cheese.title,
      description: lang === 'en' ? cheese.description_en || cheese.description : cheese.description
    });
  };

  const renderImages = () => {
    return cheeseData.concat(cheeseData).map((cheese, index) => (
      <img
        key={index}
        src={cheese.image}
        alt={lang === 'en' ? cheese.title_en : cheese.title}
        className={style.carouselImage}
        onClick={() => handleImageClick(cheese)}
      />
    ));
  };

  return (
    <div
      className={style.carouselContainer}
      ref={carouselRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={style.carouselContent}>
        {renderImages()}
      </div>

      {selectedCheese && (
        <ModalCheeseWindow
          closeModal={closeModal}
          selectedCheese={selectedCheese}
        />
      )}
    </div>
  );
};

export default Carousel;
