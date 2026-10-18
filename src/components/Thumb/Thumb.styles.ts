import styled from 'styled-components';

export const ThumbWrapper = styled.div`
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 20px;
  animation: animateMovieThumb 0.5s;
  :hover {
    opacity: 0.8;
  }
  @keyframes animateMovieThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const WatchlistButton = styled.button<{ $saved: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(28, 28, 28, 0.8);
  color: ${(props) => (props.$saved ? "#e50914" : "var(--white)")};
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s;
  backdrop-filter: blur(4px);

  &:hover {
    transform: scale(1.15);
    background: rgba(28, 28, 28, 0.95);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`;
