import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  type Variants,
  useInView,
  useAnimation,
} from "framer-motion";
import {
  Wrapper,
  RowContainer,
  Viewport,
  Track,
  Page,
  CardSlot,
  Dots,
  Dot,
  ArrowButton,
  RankNumeral,
} from "./Row.styles";
import Thumb from "../Thumb";
import DecoLineDraw from "../effects/DecoLine";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Movie } from "../../API";

interface RowProps {
  title: string;
  movies: Movie[];
  variant?: "trending" | "toprated";
}

const GAP = 16;
const AUTOPLAY_MS = 5000;

const getPerView = () => {
  if (typeof window === "undefined") return 5;
  const w = window.innerWidth;
  if (w < 560) return 2;
  if (w < 900) return 3;
  if (w < 1240) return 4;
  return 5;
};

/* Trending: cards cascade in with 3D perspective, pouring toward the viewer */
const trendingVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const trendingCard: Variants = {
  hidden: { y: 90, opacity: 0, rotateX: -38, scale: 0.92 },
  show: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 160, damping: 17 },
  },
};

/* Top Rated: numerals slam in, cards follow */
const rankedVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const rankedCard: Variants = {
  hidden: { y: 60, opacity: 0, scale: 0.9 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

const Row = ({ title, movies, variant = "trending" }: RowProps) => {
  const [perView, setPerView] = useState(getPerView);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Data-aware entrance (same pattern as Grid): only start the staggered
     cascade when in view AND movies are loaded, so the trigger can't fire
     on an empty container and lock cards at opacity 0. */
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(trackRef, { once: true, margin: "-60px" });
  const ready = movies.length > 0;

  useEffect(() => {
    if (inView && ready) {
      controls.start("show");
    }
  }, [inView, ready, controls]);

  useEffect(() => {
    const onResize = () => {
      setPerView(getPerView());
      setPage(0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = Math.max(1, Math.ceil(movies.length / perView));

  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  const go = useCallback(
    (dir: 1 | -1) => setPage((p) => (p + dir + pages) % pages),
    [pages]
  );

  useEffect(() => {
    if (paused || pages <= 1) return;
    const t = setInterval(() => setPage((p) => (p + 1) % pages), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, pages]);

  if (!movies || movies.length === 0) return null;

  const pageGroups: Movie[][] = [];
  for (let i = 0; i < movies.length; i += perView) {
    pageGroups.push(movies.slice(i, i + perView));
  }

  const rowVariants = variant === "toprated" ? rankedVariants : trendingVariants;
  const cardVariants = variant === "toprated" ? rankedCard : trendingCard;

  return (
    <Wrapper>
      <motion.h2
        initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 120, damping: 17 }}
      >
        <DecoLineDraw />
        {title}
      </motion.h2>
      <RowContainer
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ArrowButton direction="left" onClick={() => go(-1)} aria-label="Previous">
          &#8249;
        </ArrowButton>
        <Viewport>
          <motion.div
            ref={trackRef}
            variants={rowVariants}
            initial="hidden"
            animate={controls}
            style={variant === "trending" ? { transformPerspective: 1100 } : undefined}
          >
          <Track $page={page} $pages={pages}>
            {pageGroups.map((group, pi) => (
              <Page key={pi} $pages={pages} $gap={GAP}>
                {group.map((movie, ci) => {
                  const rank = pi * perView + ci + 1;
                  return (
                  <CardSlot
                    key={movie.id}
                    $perView={perView}
                    $gap={GAP}
                    $delay={ci * 0.07}
                    $variant={variant}
                  >
                    <motion.div variants={cardVariants} style={{ height: "100%" }}>
                      {variant === "toprated" && (
                        <RankNumeral $top3={rank <= 3} aria-hidden="true">
                          {rank}
                        </RankNumeral>
                      )}
                      <Thumb
                        clickable
                        image={
                          movie.poster_path
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id}
                        title={movie.title}
                        rating={movie.vote_average}
                      />
                    </motion.div>
                  </CardSlot>
                  );
                })}
              </Page>
            ))}
          </Track>
          </motion.div>
        </Viewport>
        <ArrowButton direction="right" onClick={() => go(1)} aria-label="Next">
          &#8250;
        </ArrowButton>
      </RowContainer>
      {pages > 1 && (
        <Dots>
          {pageGroups.map((_, i) => (
            <Dot
              key={i}
              $active={i === page}
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </Dots>
      )}
    </Wrapper>
  );
};

export default Row;
