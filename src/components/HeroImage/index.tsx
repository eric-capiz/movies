import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Wrapper,
  Backdrop,
  Shade,
  Content,
  Text,
  CtaRow,
  CtaButton,
  SlideDots,
  SlideDot,
} from "./HeroImage.styles";
import GoldDust from "../effects/GoldDust";

export interface FeaturedMovie {
  id: number;
  image: string;
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

  return (
    <Wrapper
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {movies.map((m, i) => (
        <Backdrop key={m.id} image={m.image} $active={i === index} />
      ))}
      <Shade />
      <GoldDust count={26} />
      <Content>
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
            <CtaButton href={`/${movie.id}`}>&#9654; View Details</CtaButton>
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
