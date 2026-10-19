import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
} from "./HeroImage.styles";
import GoldDust from "../effects/GoldDust";
import Hero3D from "../Hero3D/Hero3D";
import Magnetic from "../effects/Magnetic";

export interface FeaturedMovie {
  id: number;
  image: string;
  poster: string;
  title: string;
  text: string;
}

interface HeroImageProps {
  movies: FeaturedMovie[];
}

const ROTATE_MS = 6000;

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

  /* Scroll-driven cinematic exit: content lifts and dissolves as you scroll away */
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, 90]);
  const contentScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.96]);
  const contentStyle = reduceMotion
    ? undefined
    : { opacity: contentOpacity, y: contentY, scale: contentScale };

  const posters = useMemo(() => movies.map((m) => m.poster), [movies]);

  return (
    <Wrapper
      ref={heroRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Hero3D posters={posters} fallbackImage={movies[0]?.image ?? ""} />
      <Shade />
      <GoldDust count={26} />
      <Content as={motion.div} style={contentStyle}>
        <Text key={movie.id}>
          <div className="eyebrow">&#9670; Featured Premiere &#9670;</div>
          <h1 aria-label={movie.title}>
            {letters.map((ch, i) => (
              <span
                key={i}
                className="char"
                style={{ animationDelay: `${i * 0.028}s` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
          <p>{movie.text}</p>
          <CtaRow>
            <Magnetic strength={0.25}>
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
    </Wrapper>
  );
};

export default HeroImage;
