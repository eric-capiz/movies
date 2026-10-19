import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Wrapper,
  Shade,
  Content,
  Text,
  CtaRow,
  CtaButton,
  SlideDots,
  SlideDot,
  ScrollCue,
  CarouselLayer,
} from "./HeroImage.styles";
import EmberField from "../effects/EmberField";
import HeroCarousel from "../Hero3D/HeroCarousel";
import Magnetic from "../effects/Magnetic";

export interface FeaturedMovie {
  id: number;
  image: string;
  poster: string;
  title: string;
  text: string;
}

const ROTATE_MS = 7000;

interface HeroImageProps {
  movies: FeaturedMovie[];
}

/** Shrink the title until it fits on one line (desktop + mobile). */
function useFitTitle(title: string) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;
      el.style.transform = "none";
      const available = parent.clientWidth;
      const needed = el.scrollWidth;
      setScale(needed > available ? available / needed : 1);
    };
    fit();
    window.addEventListener("resize", fit);
    // re-fit once webfonts land (they change measured width)
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) fit();
      });
    }
    return () => {
      cancelled = true;
      window.removeEventListener("resize", fit);
    };
  }, [title]);

  return { ref, scale };
}

const HeroImage = ({ movies }: HeroImageProps) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    if (paused || movies.length <= 1) return;
    const t = setInterval(next, ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, movies.length, next]);

  const movie = movies[index];
  const letters = useMemo(() => movie.title.split(""), [movie.title]);
  const { ref: titleRef, scale: titleScale } = useFitTitle(movie.title);

  /* Scroll-driven cinematic exit */
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // text lifts away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 110]);
  // 3D layer zooms out dramatically and dissolves
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.32]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentStyle = reduceMotion
    ? undefined
    : { opacity: contentOpacity, y: contentY };
  const bgStyle = reduceMotion ? undefined : { scale: bgScale, opacity: bgOpacity };

  const posters = useMemo(() => movies.map((m) => m.poster), [movies]);

  return (
    <Wrapper
      ref={heroRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CarouselLayer as={motion.div} style={bgStyle}>
        <HeroCarousel posters={posters} />
      </CarouselLayer>
      <Shade />
      <EmberField count={44} />
      <Content as={motion.div} style={contentStyle}>
        <Text key={movie.id}>
          <div className="eyebrow">&#9670; Featured Premiere &#9670;</div>
          <h1
            ref={titleRef}
            aria-label={movie.title}
            style={
              titleScale < 1
                ? { transform: `scale(${titleScale})` }
                : undefined
            }
          >
            {letters.map((ch, i) => (
              <span
                key={i}
                className="char"
                style={{ animationDelay: `${0.55 + i * 0.028}s` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
            <span className="title-shimmer" aria-hidden="true" />
          </h1>
          <p>{movie.text}</p>
          <CtaRow>
            <Magnetic strength={0.3}>
              <CtaButton href={`/${movie.id}`}>&#9654; View Details</CtaButton>
            </Magnetic>
          </CtaRow>
        </Text>
      </Content>
      {movies.length > 1 && (
        <SlideDots>
          {movies.map((m, i) => (
            <SlideDot
              key={m.id}
              $active={i === index}
              onClick={() => setIndex(i)}
              aria-label={`Show ${m.title}`}
            />
          ))}
        </SlideDots>
      )}
      <ScrollCue aria-hidden="true">
        <span>Scroll</span>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="#c9a96a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ScrollCue>
    </Wrapper>
  );
};

export default HeroImage;
