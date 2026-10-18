import styled from 'styled-components';

export const ThumbWrapper = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: var(--cardBg);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 0 2px var(--accent);
    z-index: 2;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  animation: animateMovieThumb 0.5s;
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
  background: rgba(10, 10, 10, 0.8);
  color: ${(props) => (props.$saved ? "var(--accent)" : "var(--white)")};
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
    border-color: var(--accent);
    box-shadow: 0 0 12px rgba(229, 9, 20, 0.5);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
