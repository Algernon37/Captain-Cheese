import { useEffect, useRef, useState, useMemo } from "react";
import style from "./style/SliderComponent.module.sass";
import { useTranslation } from "react-i18next";

const IMAGES = [
  "/images/hero/slide1.jpg", 
  "/images/hero/slide2.jpg",
  "/images/hero/slide3.jpg",
  "/images/hero/slide4.jpg",
];

const INTERVAL_MS = 6500;

export default function SliderComponent() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const abortRef = useRef(null);
  const nextIndex = useMemo(() => (index + 1) % IMAGES.length, [index]);
  useEffect(() => {
    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      dispatchEvent(new Event("hero:ready"));
    };

    const img = new Image();
    img.decoding = "async";
    if ("fetchPriority" in img) img.fetchPriority = "high";
    img.src = IMAGES[0];

    (img.decode ? img.decode() : Promise.resolve())
      .then(fire)
      .catch(fire);
    img.onload = fire;
    img.onerror = fire;

    return () => { done = true; };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tick = async () => {
      const imgEl = new Image();
      imgEl.decoding = "async";
      if ("fetchPriority" in imgEl) imgEl.fetchPriority = "low";
      imgEl.src = IMAGES[nextIndex];

      if (abortRef.current) abortRef.current.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      try {
        if (imgEl.decode) await imgEl.decode();
        if (!ac.signal.aborted) setIndex(nextIndex);
      } catch {
        if (!ac.signal.aborted) setIndex(nextIndex);
      }
    };

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(tick, INTERVAL_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [index, nextIndex]);

  return (
    <section className={style.hero} aria-label="Featured photos">
      {IMAGES.map((src, i) => {
        const isActive = i === index;
        const isNext = i === nextIndex;
        return (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={!isActive && !isNext}
            width={1920}
            height={1080}
            className={[
              style.slide,
              isActive ? style.isActive : "",
              isNext ? style.isFadingIn : "",   
            ].join(" ")}
            decoding="async"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            draggable="false"
          />
        );
      })}

      <div className={style.vignette} aria-hidden="true" />
      <div className={style.content}>
        <div className="flex items-center justify-center gap-4">
          <h1 className={style.title}>Captain&nbsp;Cheese</h1>
          <img
            src="/favicon-96x96.png"
            alt="Captain Cheese logo"
            className={style.logo}
            draggable="false"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <p className={style.subtitle}>{t("hero.subtitle")}</p>
      </div>
    </section>
  );
}
