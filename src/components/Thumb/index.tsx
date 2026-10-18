import React from "react";
import { Link } from "react-router-dom";
import {
  Image,
  ThumbWrapper,
  WatchlistButton,
  RatingBadge,
  TitleOverlay,
} from "./Thumb.styles";
import { useWatchlistContext } from "../../hooks/WatchlistContext";

interface ThumbProps {
  image: string;
  movieId?: number;
  clickable: boolean;
  title?: string;
  rating?: number;
}

const Thumb = ({ image, movieId, clickable, title, rating }: ThumbProps) => {
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
      {rating !== undefined && (
        <RatingBadge aria-label={`Rated ${rating.toFixed(1)}`}>
          <span>{rating.toFixed(1)}</span>
        </RatingBadge>
      )}
      {clickable ? (
        <Link to={`/${movieId}`}>
          <Image src={image} alt={title ?? "movie-thumb"} />
        </Link>
      ) : (
        <Image src={image} alt={title ?? "movie-thumb"} />
      )}
      {title && (
        <TitleOverlay>
          <h4>{title}</h4>
        </TitleOverlay>
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
