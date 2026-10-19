import React, { useState, useEffect, useRef, useMemo } from "react";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import { useHomeFetch } from "../hooks/useHomeFetch";
import { useWatchlistContext } from "../hooks/WatchlistContext";
import HeroImage, { FeaturedMovie } from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Row from "./Row";
import Spinner from "./Spinner";
import Search from "./Search";
import Button from "./Button";
import DecoDivider from "./effects/DecoDivider";
import DecoLineDraw from "./effects/DecoLine";
import Marquee from "./effects/Marquee";
import SkeletonCard from "./effects/SkeletonCard";
import NoImage from "../images/no_image.jpg";
import API, { Movie, Genre } from "../API"; // Add this import
import {
  PillBar,
  Pill,
  SectionHeader,
  WatchlistSection,
  WatchlistGrid,
  EmptyMessage,
} from "./Home.styles";

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();
  const { watchlist } = useWatchlistContext();

  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const movieCache = useRef<Map<number, Movie>>(new Map());

  // Fetch trending, top rated, and genres on mount
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const trendingData = await API.fetchTrending();
        setTrending(trendingData.results);
      } catch {
        // rows fail silently — grid still works
      }
      try {
        const topRatedData = await API.fetchTopRated();
        setTopRated(topRatedData.results);
      } catch {
        // rows fail silently — grid still works
      }
      try {
        const genreList = await API.fetchGenres();
        setGenres(genreList);
      } catch {
        // pills fail silently
      }
    };
    fetchRows();
  }, []);

  // Resolve watchlist IDs to movie data (cached)
  useEffect(() => {
    const resolve = async () => {
      const missing = watchlist.filter((id) => !movieCache.current.has(id));
      if (missing.length > 0) {
        const fetched = await Promise.all(
          missing.map((id) =>
            API.fetchMovie(id).catch(() => null)
          )
        );
        fetched.forEach((movie) => {
          if (movie) movieCache.current.set(movie.id, movie);
        });
      }
      setWatchlistMovies(
        watchlist
          .map((id) => movieCache.current.get(id))
          .filter((m): m is Movie => m !== undefined)
      );
    };
    resolve();
  }, [watchlist]);

  const handleGenreSelect = async (genreId: number | null) => {
    setSelectedGenre(genreId);
    if (genreId === null) {
      setGenreMovies([]);
      return;
    }
    try {
      setGenreLoading(true);
      const data = await API.fetchByGenre(genreId);
      setGenreMovies(data.results);
    } catch {
      setGenreMovies([]);
    } finally {
      setGenreLoading(false);
    }
  };

  const featured: FeaturedMovie[] = useMemo(
    () =>
      state.results
        .filter((m) => m.backdrop_path)
        .slice(0, 5)
        .map((m) => ({
          id: m.id,
          image: `${IMAGE_BASE_URL}${BACKDROP_SIZE}${m.backdrop_path}`,
          poster: m.poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${m.poster_path}`
            : NoImage,
          title: m.original_title,
          text: m.overview,
        })),
    [state.results]
  );

  const marqueeTitles = useMemo(
    () => trending.slice(0, 10).map((m) => m.title),
    [trending]
  );

  if (error) return <div>Something Went Wrong...</div>;

  const isBrowsing = !searchTerm && selectedGenre === null;
  const gridMovies = selectedGenre !== null ? genreMovies : state.results;
  const gridHeader = searchTerm
    ? "Search Results"
    : selectedGenre !== null
      ? `${genres.find((g) => g.id === selectedGenre)?.name ?? ""} Movies`
      : "Popular Movies";

  const posterFor = (movie: Movie) =>
    movie.poster_path
      ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
      : NoImage;

  return (
    <>
      {!searchTerm && featured.length > 0 ? (
        <HeroImage movies={featured} />
      ) : null}
      <Search setSeachTerm={setSearchTerm} />

      {isBrowsing && marqueeTitles.length > 0 && (
        <Marquee titles={marqueeTitles} />
      )}

      {isBrowsing && (
        <>
          <Row title="Trending Now" movies={trending} />
          <DecoDivider />
          <Row title="Top Rated" movies={topRated} />
          <DecoDivider />
          <WatchlistSection>
            <SectionHeader>
              <DecoLineDraw />
              My Watchlist
            </SectionHeader>
            {watchlistMovies.length > 0 ? (
              <WatchlistGrid>
                {watchlistMovies.map((movie) => (
                  <Thumb
                    key={movie.id}
                    clickable
                    image={posterFor(movie)}
                    movieId={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                  />
                ))}
              </WatchlistGrid>
            ) : (
              <EmptyMessage>
                No movies saved yet — tap the &#9825; on any poster to keep it
                here.
              </EmptyMessage>
            )}
          </WatchlistSection>
        </>
      )}

      {!searchTerm && genres.length > 0 && (
        <PillBar>
          <Pill
            $active={selectedGenre === null}
            onClick={() => handleGenreSelect(null)}
          >
            All
          </Pill>
          {genres.map((genre) => (
            <Pill
              key={genre.id}
              $active={selectedGenre === genre.id}
              onClick={() => handleGenreSelect(genre.id)}
            >
              {genre.name}
            </Pill>
          ))}
        </PillBar>
      )}

      {genreLoading ? (
        <WatchlistGrid
          style={{ maxWidth: "var(--maxWidth)", margin: "0 auto", padding: "20px" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </WatchlistGrid>
      ) : (
        <Grid header={gridHeader}>
          {gridMovies.map((movie: Movie) => (
            <Thumb
              key={movie.id}
              clickable
              image={posterFor(movie)}
              movieId={movie.id}
              title={movie.title}
              rating={movie.vote_average}
            />
          ))}
        </Grid>
      )}
      {loading && <Spinner />}
      {selectedGenre === null &&
        state.page < state.total_pages &&
        !loading && (
          <Button text="Load More" callback={() => setIsLoadingMore(true)} />
        )}
    </>
  );
};

export default Home;
