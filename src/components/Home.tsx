import React, { useState, useEffect, useRef } from "react";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import { useHomeFetch } from "../hooks/useHomeFetch";
import { useWatchlistContext } from "../hooks/WatchlistContext";
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Row from "./Row";
import Spinner from "./Spinner";
import Search from "./Search";
import Button from "./Button";
import NoImage from "../images/no_image.jpg";
import API, { Movie, Genre } from "../API"; // Add this import
import {
  PillBar,
  Pill,
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

  if (error) return <div>Something Went Wrong...</div>;

  const isBrowsing = !searchTerm && selectedGenre === null;
  const gridMovies = selectedGenre !== null ? genreMovies : state.results;
  const gridHeader = searchTerm
    ? "Search Results"
    : selectedGenre !== null
      ? `${genres.find((g) => g.id === selectedGenre)?.name ?? ""} Movies`
      : "Popular Movies";

  return (
    <>
      {!searchTerm && state.results[1] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[1].backdrop_path}`}
          title={state.results[1].original_title}
          text={state.results[1].overview}
        />
      ) : null}
      <Search setSeachTerm={setSearchTerm} />

      {isBrowsing && (
        <>
          <Row title="Trending Now" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <WatchlistSection>
            <h2>My Watchlist</h2>
            {watchlistMovies.length > 0 ? (
              <WatchlistGrid>
                {watchlistMovies.map((movie) => (
                  <Thumb
                    key={movie.id}
                    clickable
                    image={
                      movie.poster_path
                        ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                        : NoImage
                    }
                    movieId={movie.id}
                  />
                ))}
              </WatchlistGrid>
            ) : (
              <EmptyMessage>No movies saved yet.</EmptyMessage>
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
        <Spinner />
      ) : (
        <Grid header={gridHeader}>
          {gridMovies.map((movie: Movie) => (
            <Thumb
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
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
