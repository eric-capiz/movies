import React from "react";
import { Link } from "react-router-dom";
import { Image, ThumbWrapper, WatchlistButton } from "./Thumb.styles";
import { useWatchlistContext } from "../../hooks/WatchlistContext";

interface ThumbProps {
  image: string;
  movieId?: number;
  clickable: boolean;
}

const Thumb = ({ image, movieId, clickable }: ThumbProps) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlistContext();

  const showBookmark = clickable && movieId !== undefined;
  const saved = showBookmark && isInWatchlist(movieId as number);

  const handleBookmarkClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (movieId !== undefined) {
      toggleWatchlist(movieId);
    }
  };

  return (
    <ThumbWrapper>
      {clickable ? (
        <Link to={`/${movieId}`}>
          <Image src={image} alt="movie-thumb" />
        </Link>
      ) : (
        <Image src={image} alt="movie-thumb" />
      )}
      {showBookmark && (
        <WatchlistButton
          onClick={handleBookmarkClick}
          aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
          title={saved ? "Remove from watchlist" : "Add to watchlist"}
          $saved={saved}
        >
          {saved ? "\u2665" : "\u2661"}
        </WatchlistButton>
      )}
    </ThumbWrapper>
  );
};

export default Thumb;
