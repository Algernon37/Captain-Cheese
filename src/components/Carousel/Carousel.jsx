import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import style from "./style/carousel.module.sass";
import ModalCheeseWindow from "../ModalCheeseWindow/ModalCheeseWindow";
import cheeseData from "../../json/cheeses.json";

const images = import.meta.glob(
  "../../assets/all/*.{png,jpg,jpeg,JPG,PNG,webp,avif}",
  { eager: true, query: "?url", import: "default" }
);

const IMAGE_MAP = Object.fromEntries(
  Object.entries(images).map(([key, url]) => {
    const fileName = key.split("/").pop()?.toLowerCase() ?? "";
    return [fileName, url];
  })
);

const Carousel = ({ direction }) => {
  const carouselRef = useRef(null);

  const rafIdRef = useRef(0);
  const xRef = useRef(0);               
  const speedRef = useRef(0.3);        
  const pausedRef = useRef(false);      
  const halfRef = useRef(0);            
  const readyRef = useRef(false);       

  const [selectedCheese, setSelectedCheese] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    pausedRef.current = isInteracting || !!selectedCheese || !readyRef.current;
  }, [isInteracting, selectedCheese]);

  useEffect(() => {
    const base = Math.abs(speedRef.current) || 0.12;
    speedRef.current = direction === "left" ? -base : base;
  }, [direction]);

  const resolveImageSrc = useCallback((fileName) => {
    const name = (fileName || "").split("/").pop()?.toLowerCase();
    const url = IMAGE_MAP[name];
    if (!url) console.warn("[Carousel] image not found:", name);
    return url || "";
  }, []);

  const closeModal = useCallback(() => {
    setSelectedCheese(null);
    setIsInteracting(false);
    const c = carouselRef.current;
    if (c) xRef.current = c.scrollLeft; 
  }, []);

  const handleImageClick = useCallback(
    (cheese) => {
      const src = resolveImageSrc(cheese.image);
      setSelectedCheese({
        ...cheese,
        image: src,
        title: lang === "en" ? cheese.title_en || cheese.title : cheese.title,
        description:
          lang === "en"
            ? cheese.description_en || cheese.description
            : cheese.description,
      });
    },
    [lang, resolveImageSrc]
  );

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    el.style.scrollBehavior = "auto";

    const calcHalf = () => {
      halfRef.current = (el.scrollWidth / 2) | 0;
    };
    calcHalf();

    const animate = () => {
      
      rafIdRef.current = requestAnimationFrame(animate);

      if (pausedRef.current) return;

      xRef.current += speedRef.current;

      const half = halfRef.current;
      if (xRef.current >= half) xRef.current = 0;
      else if (xRef.current <= 0) xRef.current = half;

      el.scrollLeft = xRef.current;
    };

    const onResize = () => {
      calcHalf();
      xRef.current = el.scrollLeft;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const preload = async () => {
      try {
        const firstUrls = cheeseData.slice(0, 4).map((c) => resolveImageSrc(c.image));
        await Promise.all(
          firstUrls.map((src) => {
            if (!src) return Promise.resolve();
            const img = new Image();
            img.src = src;
            img.decoding = "async";
            return img.decode().catch(() => void 0);
          })
        );
      } catch {}
      finally {
        readyRef.current = true;
        pausedRef.current = false;
      }
    };

    preload();
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") {
        const el = carouselRef.current;
        if (el) xRef.current = el.scrollLeft;
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const renderImages = useMemo(
    () =>
      [...cheeseData, ...cheeseData].map((cheese, i) => {
        const src = resolveImageSrc(cheese.image);
        const isFirstRow = i < cheeseData.length;
        return (
          <img
            key={`${cheese.name}-${i}`}
            src={src}
            alt={lang === "en" ? cheese.title_en : cheese.title}
            className={style.carouselImage}
            onClick={() => handleImageClick(cheese)}
            draggable="false"
            decoding="async"
            loading={isFirstRow ? "eager" : "lazy"} 
          />
        );
      }),
    [lang, handleImageClick, resolveImageSrc]
  );

  return (
    <div
      className={style.carouselContainer}
      ref={carouselRef}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
      onPointerCancel={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      <div className={style.carouselContent}>{renderImages}</div>

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


