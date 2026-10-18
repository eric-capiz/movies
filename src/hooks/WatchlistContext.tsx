import React, { createContext, useContext, ReactNode } from "react";
import useWatchlist from "./useWatchlist";

interface WatchlistContextValue {
  watchlist: number[];
  toggleWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(
  undefined
);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const value = useWatchlist();
  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlistContext = (): WatchlistContextValue => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error(
      "useWatchlistContext must be used within a WatchlistProvider"
    );
  }
  return context;
};

export default WatchlistContext;
