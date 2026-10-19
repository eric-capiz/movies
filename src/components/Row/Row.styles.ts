import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;

  h2 {
    font-family: var(--fontSerif);
    color: var(--white);
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 34px 0 6px 0;
    display: flex;
    align-items: center;
    gap: 14px;
    &::after {
      content: "\u2726";
      color: var(--accent);
      font-size: 0.85rem;
    }
    @media screen and (max-width: 768px) {
      font-size: var(--fontMed);
    }
  }
`;

export const RowContainer = styled.div`
  position: relative;
  width: 100%;
  perspective: 1200px;
`;

export const Viewport = styled.div`
  overflow: hidden;
  padding: 18px 4px 26px 4px;
`;

export const Track = styled.div<{ $page: number; $pages: number }>`
  display: flex;
  width: ${(p) => p.$pages * 100}%;
  transform: translateX(-${(p) => (p.$page * 100) / p.$pages}%);
  transition: transform 0.7s cubic-bezier(0.22, 0.8, 0.24, 1);
`;

export const Page = styled.div<{ $pages: number; $gap: number }>`
  flex: 0 0 ${(p) => 100 / p.$pages}%;
  display: flex;
  gap: ${(p) => p.$gap}px;
  padding: 0 ${(p) => p.$gap / 2}px;
`;

export const CardSlot = styled.div<{ $perView: number; $gap: number; $delay: number }>`
  flex: 1 1 0;
  min-width: 0;
  animation: fadeInUp 0.6s ease ${(p) => p.$delay}s both;
  /* 3D tilt target */
  transform-style: preserve-3d;
  will-change: transform;
`;

export const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2px;
  padding-bottom: 6px;
`;

export const Dot = styled.button<{ $active: boolean }>`
  width: ${(p) => (p.$active ? "28px" : "9px")};
  height: 9px;
  border-radius: 6px;
  border: 1px solid var(--accent);
  background: ${(p) => (p.$active ? "var(--accent)" : "transparent")};
  box-shadow: ${(p) => (p.$active ? "0 0 10px rgba(201,169,106,0.7)" : "none")};
  cursor: pointer;
  transition: all 0.4s;
  padding: 0;
  &:hover {
    background: rgba(201, 169, 106, 0.45);
  }
`;

export const ArrowButton = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 42%;
  ${(props) => (props.direction === "left" ? "left: -6px;" : "right: -6px;")}
  transform: translateY(-50%);
  z-index: 10;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(10, 14, 26, 0.92);
  color: var(--accent);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: 1px solid var(--accent);
  box-shadow: 0 0 0 rgba(201, 169, 106, 0);

  &:hover {
    background: rgba(201, 169, 106, 0.14);
    color: var(--accentHover);
    transform: translateY(-50%) scale(1.12);
    box-shadow: 0 0 18px rgba(201, 169, 106, 0.45);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
