import styled from "styled-components";

export const PillBar = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 14px 20px 0 20px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Pill = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  padding: 9px 20px;
  border-radius: 999px;
  font-size: var(--fontSmall);
  font-family: "Abel", sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.25, 1);
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--accent)" : "rgba(201, 169, 106, 0.3)"};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(120deg, rgba(201,169,106,0.25), rgba(201,169,106,0.08))"
      : "rgba(18, 22, 31, 0.8)"};
  color: ${(props) => (props.$active ? "var(--accentHover)" : "var(--lightGrey)")};
  ${(props) =>
    props.$active
      ? `
    /* ripple shockwave on select */
    &::after {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: 999px;
      border: 2px solid var(--accent);
      animation: rippleRing 0.7s ease-out both;
      pointer-events: none;
    }
  `
      : ""}

  &:hover {
    border-color: var(--accent);
    color: var(--accentHover);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(201, 169, 106, 0.25);
  }

  &:active {
    transform: translateY(0) scale(0.94);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const SectionHeader = styled.h2`
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
`;

export const WatchlistSection = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;
`;

export const WatchlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1.5rem;
  padding: 18px 0 10px 0;
  > * {
    animation: fadeInUp 0.6s ease both;
  }
  > *:nth-child(1) { animation-delay: 0.02s; }
  > *:nth-child(2) { animation-delay: 0.06s; }
  > *:nth-child(3) { animation-delay: 0.1s; }
  > *:nth-child(4) { animation-delay: 0.14s; }
  > *:nth-child(5) { animation-delay: 0.18s; }
  > *:nth-child(6) { animation-delay: 0.22s; }
  > *:nth-child(n+7) { animation-delay: 0.26s; }
`;

export const EmptyMessage = styled.p`
  color: var(--lightGrey);
  opacity: 0.7;
  font-size: var(--fontMed);
  font-style: italic;
  padding: 10px 0 20px 0;
`;
