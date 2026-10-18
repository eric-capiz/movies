import { SEARCH_BASE_URL, POPULAR_BASE_URL, API_URL } from "./config";

// Types for Movie results
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  original_title: string;
  vote_average: number;
}

// Types for API responses
export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse extends Movie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
}

export interface Cast {
  credit_id: string;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  credit_id: string;
  name: string;
  job: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

const authHeaders = {
  Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
  accept: "application/json",
};

const apiSettings = {
  fetchMovies: async (
    searchTerm: string,
    page: number
  ): Promise<MoviesResponse> => {
    try {
      const endpoint: string = searchTerm
        ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
        : `${POPULAR_BASE_URL}&page=${page}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        console.error("Response not OK:", {
          status: response.status,
          statusText: response.statusText,
          url: endpoint,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: MoviesResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchMovies:", error);
      throw error;
    }
  },

  fetchMovie: async (movieId: number): Promise<MovieResponse> => {
    try {
      const endpoint: string = `${API_URL}movie/${movieId}`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Movie fetch failed: ${response.status}`);
      }

      const data: MovieResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie:", error);
      throw error;
    }
  },

  fetchCredits: async (movieId: number): Promise<Credits> => {
    try {
      const creditsEndpoint: string = `${API_URL}movie/${movieId}/credits`;

      const response = await fetch(creditsEndpoint, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Credits fetch failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching credits:", error);
      throw error;
    }
  },
  fetchTrending: async (): Promise<MoviesResponse> => {
    try {
      const endpoint: string = `${API_URL}trending/movie/week?language=en-US`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Trending fetch failed: ${response.status}`);
      }

      const data: MoviesResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching trending:", error);
      throw error;
    }
  },

  fetchTopRated: async (): Promise<MoviesResponse> => {
    try {
      const endpoint: string = `${API_URL}movie/top_rated?language=en-US`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Top rated fetch failed: ${response.status}`);
      }

      const data: MoviesResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching top rated:", error);
      throw error;
    }
  },

  fetchGenres: async (): Promise<Genre[]> => {
    try {
      const endpoint: string = `${API_URL}genre/movie/list?language=en-US`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Genres fetch failed: ${response.status}`);
      }

      const data: GenresResponse = await response.json();
      return data.genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  },

  fetchByGenre: async (genreId: number): Promise<MoviesResponse> => {
    try {
      const endpoint: string = `${API_URL}discover/movie?language=en-US&with_genres=${genreId}`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error(`Discover by genre failed: ${response.status}`);
      }

      const data: MoviesResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching by genre:", error);
      throw error;
    }
  },
};

export default apiSettings;
