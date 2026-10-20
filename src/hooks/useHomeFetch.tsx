import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";
import { MoviesResponse } from "../API";

const initialState: MoviesResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [state, setState] = useState<MoviesResponse>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm: string = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      if (!movies) {
        throw new Error("No movies data received");
      }

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setState(initialState);

    if (!searchTerm) {
      const sessionState = isPersistedState("homeState");
      if (sessionState && sessionState.results) {
        setState(sessionState);
        return;
      }
    }

    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!searchTerm && state.results.length > 0) {
      sessionStorage.setItem("homeState", JSON.stringify(state));
    }
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
