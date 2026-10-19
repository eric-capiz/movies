import styled from "styled-components";

export const Stage = styled.div`
  position: absolute;
  inset: 0;
  perspective: 1400px;
  overflow: hidden;
  z-index: 1;
`;

export const Ring = styled.div`
  position: absolute;
  left: 50%;
  top: 52%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  will-change: transform;
`;

export const Slot = styled.div<{ $angle: number; $radius: number }>`
  position: absolute;
  left: 0;
  top: 0;
  transform: ${(p) => `rotateY(${p.$angle}deg) translateZ(${p.$radius}px)`};
  transform-style: preserve-3d;
  /* hide when the ring carries it behind (no mirrored posters) */
  backface-visibility: hidden;
`;

export const PosterFrame = styled.div`
  width: clamp(150px, 17vw, 215px);
  aspect-ratio: 2 / 3;
  margin-left: calc(clamp(150px, 17vw, 215px) / -2);
  margin-top: calc(clamp(150px, 17vw, 215px) / -2 * 1.5);
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;

  /* gold rim */
  border: 2px solid rgba(201, 169, 106, 0.85);
  outline: 1px solid rgba(201, 169, 106, 0.3);
  outline-offset: 6px;
  border-radius: 3px;
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.75),
    0 0 34px rgba(201, 169, 106, 0.22);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 2px;
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.25, 1), filter 0.45s ease;
  }

  .bob {
    width: 100%;
    height: 100%;
    animation: bobFloat 5.2s ease-in-out infinite;
  }

  &:hover {
    z-index: 5;
    img {
      transform: scale(1.15);
      filter: brightness(1.28) saturate(1.1);
    }
    border-color: #f3e2b8;
    animation: glowPulse 1.1s ease-in-out infinite;
  }

  @media screen and (max-width: 720px) {
    outline-offset: 4px;
  }
`;

export const StaticArc = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 3vw, 30px);
  z-index: 1;
  img {
    width: clamp(110px, 16vw, 180px);
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border: 2px solid rgba(201, 169, 106, 0.85);
    border-radius: 3px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.7), 0 0 24px rgba(201, 169, 106, 0.2);
  }
`;
