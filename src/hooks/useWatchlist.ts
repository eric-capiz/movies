import { useState, useEffect, useCallback } from "react";

const WATCHLIST_KEY = "zeta-watchlist";

const readWatchlist = (): number[] => {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((id): id is number => typeof id === "number");
    }
    return [];
  } catch {
    return [];
  }
};

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    setWatchlist(readWatchlist());
  }, []);

  const toggleWatchlist = useCallback((id: number) => {
    setWatchlist((prev) => {
      const next = prev.includes(id)
        ? prev.filter((movieId) => movieId !== id)
        : [...prev, id];
      try {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
      } catch {
        // ignore persistence errors
      }
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: number) => watchlist.includes(id),
    [watchlist]
  );

  return { watchlist, toggleWatchlist, isInWatchlist };
};

export default useWatchlist;
