import styled from 'styled-components';

export const ThumbWrapper = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: var(--cardBg);
  /* art deco double-line frame */
  border: 1px solid rgba(201, 169, 106, 0.35);
  outline: 1px solid rgba(201, 169, 106, 0.12);
  outline-offset: 4px;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.25, 1), box-shadow 0.35s ease;
  transform-style: preserve-3d;
  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow:
      0 18px 40px rgba(0, 0, 0, 0.65),
      0 0 0 1px var(--accent),
      0 0 28px rgba(201, 169, 106, 0.35);
    z-index: 2;
  }
  /* shimmer sweep on hover */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 45%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(243, 226, 184, 0.22),
      transparent
    );
    transform: translateX(-120%) skewX(-18deg);
    pointer-events: none;
    z-index: 4;
  }
  &:hover::after {
    animation: shimmerSweep 0.9s ease;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 720px;
  transition: transform 0.5s ease, filter 0.5s ease;
  object-fit: cover;
  border-radius: 4px;
  display: block;
  ${ThumbWrapper}:hover & {
    transform: scale(1.07);
    filter: brightness(1.12) saturate(1.06);
  }
`;

export const TitleOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  padding: 26px 12px 10px 12px;
  background: linear-gradient(to top, rgba(10, 14, 26, 0.95) 0%, transparent 100%);
  transform: translateY(102%);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.25, 1);
  ${ThumbWrapper}:hover & {
    transform: translateY(0);
  }
  h4 {
    margin: 0;
    font-family: var(--fontSerif);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--white);
    letter-spacing: 0.5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const RatingBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #e0c088 0%, #c9a96a 55%, #8a6a3b 100%);
  border: 1px solid #f3e2b8;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6), 0 0 12px rgba(201, 169, 106, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-family: var(--fontSerif);
    font-weight: 800;
    font-size: 0.8rem;
    color: #0a0e1a;
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
  border: 1px solid rgba(201, 169, 106, 0.5);
  background: rgba(10, 14, 26, 0.85);
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
    box-shadow: 0 0 12px rgba(201, 169, 106, 0.5);
  }

  &:active {
    animation: popIn 0.35s ease;
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
