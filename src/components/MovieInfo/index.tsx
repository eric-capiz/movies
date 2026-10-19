import React from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Wrapper, BackdropLayer, Content, Text, RatingBar } from "./MovieInfo.styles";
import Thumb from "../Thumb";
import { MovieState } from "../../hooks/useMovieFetch";

interface MovieInfoProps {
  movie: MovieState;
}

/* Info sections rise in quickly, guiding the eye down the hierarchy */
const infoVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const sectionVariants: Variants = {
  hidden: { y: 18, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.2, 0.8, 0.25, 1] },
  },
};

const MovieInfo = ({ movie }: MovieInfoProps) => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  /* backdrop drifts slower than the page for cinematic depth */
  const backdropY = useTransform(scrollY, [0, 500], [0, 90]);

  const ratingPct = Math.min(100, Math.max(0, (movie.vote_average / 10) * 100));

  return (
    <Wrapper>
      <BackdropLayer
        $backdrop={movie.backdrop_path || ""}
        as={motion.div}
        style={reduceMotion ? undefined : { y: backdropY }}
        aria-hidden="true"
      />
      <Content>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="show"
          style={{ flexShrink: 0 }}
        >
          <Thumb
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            clickable={false}
          />
        </motion.div>
        <Text
          as={motion.div}
          variants={infoVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1 variants={sectionVariants}>{movie.title}</motion.h1>
          <motion.div variants={sectionVariants}>
            <h3>PLOT</h3>
            <p>{movie.overview}</p>
          </motion.div>

          <motion.div className="rating-director" variants={sectionVariants}>
            <div>
              <h3>RATING</h3>
              <div className="score">{movie.vote_average}</div>
              <RatingBar aria-hidden="true">
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: `${ratingPct}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.35 }}
                />
              </RatingBar>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </motion.div>
        </Text>
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;
