import React, { useState, useEffect, useCallback, useRef } from "react";
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

/* 3D tilt card — desktop pointers only, transform-only */
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s ease", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
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
      <h2>{title}</h2>
      <RowContainer
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ArrowButton direction="left" onClick={() => go(-1)} aria-label="Previous">
          &#8249;
        </ArrowButton>
        <Viewport>
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
                    <TiltCard>
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
                    </TiltCard>
                  </CardSlot>
                ))}
              </Page>
            ))}
          </Track>
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
