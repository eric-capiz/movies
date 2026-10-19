import styled from "styled-components";

interface BackdropProps {
  image: string;
  $active: boolean;
}

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  height: 100svh;
  min-height: 640px;
  overflow: hidden;
  background: #0a0e1a;
`;

export const CarouselLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  will-change: transform, opacity;
`;

export const Backdrop = styled.div<BackdropProps>`
  position: absolute;
  inset: 0;
  background-image: url('${(p) => p.image}');
  background-size: cover;
  background-position: center top;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 1.4s ease-in-out;
  &::after {
    /* ken burns drift while active */
    content: "";
    position: absolute;
    inset: -4%;
    background-image: inherit;
    background-size: cover;
    background-position: center top;
    opacity: 0;
  }
`;

export const KenBurns = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 1.4s ease-in-out;
  animation: ${(p) => (p.$active ? "kenburns 7s ease-out forwards" : "none")};
`;

export const Shade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(
      to right,
      rgba(10, 14, 26, 0.96) 0%,
      rgba(10, 14, 26, 0.55) 45%,
      rgba(10, 14, 26, 0.05) 100%
    ),
    linear-gradient(
      to bottom,
      rgba(10, 14, 26, 0.25) 0%,
      transparent 35%,
      rgba(10, 14, 26, 0.92) 100%
    );
`;

export const Content = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 110px;
  @media screen and (max-width: 720px) {
    padding-bottom: 92px;
  }
`;

export const Text = styled.div`
  max-width: 720px;
  .eyebrow {
    font-family: var(--fontSerif);
    font-style: italic;
    color: var(--accent);
    letter-spacing: 5px;
    font-size: 0.95rem;
    text-transform: uppercase;
    margin-bottom: 14px;
    animation: fadeInUp 0.8s ease both;
  }
  h1 {
    font-family: var(--fontSerif);
    font-size: clamp(2.2rem, 5.2vw, 4.4rem);
    font-weight: 800;
    line-height: 1.08;
    margin: 0 0 18px 0;
    color: var(--white);
    text-shadow: 3px 3px 18px rgba(0, 0, 0, 0.85);
    /* one line, always — JS scales it down to fit */
    white-space: nowrap;
    position: relative;
    transform-origin: left center;
    .char {
      display: inline-block;
      opacity: 0;
      animation: letterReveal 0.55s cubic-bezier(0.2, 0.8, 0.25, 1) forwards;
    }
    /* gold shimmer sweep across the title after letters land */
    .title-shimmer {
      position: absolute;
      inset: -6% -2%;
      pointer-events: none;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(243, 226, 184, 0) 42%,
        rgba(243, 226, 184, 0.85) 50%,
        rgba(243, 226, 184, 0) 58%,
        transparent 100%
      );
      mix-blend-mode: overlay;
      transform: translateX(-130%) skewX(-18deg);
      animation: titleShimmer 1.4s cubic-bezier(0.4, 0, 0.2, 1) 1.6s both;
    }
  }
  p {
    font-size: var(--fontMed);
    color: #d8d2c2;
    max-width: 560px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.9);
    animation: fadeInUp 0.8s ease 0.35s both;
    @media screen and (max-width: 720px) {
      font-size: var(--fontSmall);
    }
  }
`;

export const CtaRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 26px;
  animation: fadeInUp 0.8s ease 0.55s both;
  @media screen and (max-width: 720px) {
    flex-wrap: wrap;
  }
`;

export const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 34px;
  border: 1px solid var(--accent);
  color: var(--accent);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-decoration: none;
  background: rgba(10, 14, 26, 0.55);
  backdrop-filter: blur(6px);
  border-radius: 2px;
  transition: all 0.3s;
  animation: pulseGlow 2.6s ease-in-out infinite;
  &:hover {
    background: rgba(201, 169, 106, 0.16);
    color: var(--accentHover);
    border-color: var(--accentHover);
    transform: translateY(-2px);
  }
`;

export const ScrollCue = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  span {
    font-size: 0.68rem;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--accent);
    font-family: var(--fontSerif);
    font-style: italic;
  }
  svg {
    animation: scrollHint 2.2s ease-in-out infinite;
    filter: drop-shadow(0 0 6px rgba(201, 169, 106, 0.8));
  }
`;

export const SlideDots = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 28px;
  right: 32px;
  display: flex;
  gap: 10px;
`;

export const SlideDot = styled.button<{ $active: boolean }>`
  width: ${(p) => (p.$active ? "30px" : "10px")};
  height: 10px;
  border-radius: 6px;
  border: 1px solid var(--accent);
  background: ${(p) => (p.$active ? "var(--accent)" : "transparent")};
  cursor: pointer;
  transition: all 0.4s;
  padding: 0;
  &:hover {
    background: rgba(201, 169, 106, 0.5);
  }
`;
