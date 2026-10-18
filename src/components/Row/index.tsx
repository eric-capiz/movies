import React, { useRef } from "react";
import { Wrapper, RowContainer, Scroller, ThumbWrapper, ArrowButton } from "./Row.styles";
import Thumb from "../Thumb";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Movie } from "../../API";

interface RowProps {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: RowProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const scrollAmount = scroller.clientWidth * 0.8;
    scroller.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <Wrapper>
      <h2>{title}</h2>
      <RowContainer>
        <ArrowButton
          direction="left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          &#8249;
        </ArrowButton>
        <Scroller ref={scrollerRef}>
          {movies.map((movie) => (
            <ThumbWrapper key={movie.id}>
              <Thumb
                clickable
                image={
                  movie.poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movieId={movie.id}
              />
            </ThumbWrapper>
          ))}
        </Scroller>
        <ArrowButton
          direction="right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          &#8250;
        </ArrowButton>
      </RowContainer>
    </Wrapper>
  );
};

export default Row;
