import React, { useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
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
} from "./Row.styles";
import Thumb from "../Thumb";
import DecoLineDraw from "../effects/DecoLine";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Movie } from "../../API";

interface RowProps {
  title: string;
  movies: Movie[];
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

/* Cards rise in with a quick stagger when the row scrolls into view */
const rowVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.25, 1] },
  },
};

const Row = ({ title, movies }: RowProps) => {
  const [perView, setPerView] = useState(getPerView);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

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

  return (
    <Wrapper>
      <h2>
        <DecoLineDraw />
        {title}
      </h2>
      <RowContainer
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ArrowButton direction="left" onClick={() => go(-1)} aria-label="Previous">
          &#8249;
        </ArrowButton>
        <Viewport>
          <motion.div
            variants={rowVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
          <Track $page={page} $pages={pages}>
            {pageGroups.map((group, pi) => (
              <Page key={pi} $pages={pages} $gap={GAP}>
                {group.map((movie, ci) => (
                  <CardSlot
                    key={movie.id}
                    $perView={perView}
                    $gap={GAP}
                    $delay={ci * 0.07}
                  >
                    <motion.div variants={cardVariants} style={{ height: "100%" }}>
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
                ))}
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
