import styled from "styled-components";

export const PillBar = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 10px 20px 0 20px;
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
  padding: 8px 18px;
  border-radius: 4px;
  font-size: var(--fontSmall);
  font-family: "Abel", sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.25s;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--accent)" : "rgba(255, 255, 255, 0.2)"};
  background: ${(props) =>
    props.$active ? "var(--accent)" : "rgba(26, 26, 26, 0.8)"};
  color: var(--white);

  &:hover {
    border-color: var(--accent);
    transform: scale(1.05);
    box-shadow: 0 0 12px rgba(229, 9, 20, 0.4);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const WatchlistSection = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;

  h2 {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 30px 0 10px 0;
    padding-left: 12px;
    border-left: 4px solid var(--accent);
    @media screen and (max-width: 768px) {
      font-size: var(--fontMed);
    }
  }
`;

export const WatchlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 1.5rem;
  padding: 10px 0 10px 0;
`;

export const EmptyMessage = styled.p`
  color: var(--lightGrey);
  opacity: 0.6;
  font-size: var(--fontMed);
  padding: 10px 0 20px 0;
`;
