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
  border-radius: 999px;
  font-size: var(--fontSmall);
  font-family: "Abel", sans-serif;
  cursor: pointer;
  transition: all 0.25s;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--white)" : "rgba(255, 255, 255, 0.25)"};
  background: ${(props) =>
    props.$active ? "var(--white)" : "rgba(28, 28, 28, 0.8)"};
  color: ${(props) => (props.$active ? "var(--darkGrey)" : "var(--white)")};

  &:hover {
    border-color: var(--white);
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`;

export const WatchlistSection = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;

  h2 {
    color: var(--white);
    font-size: var(--fontBig);
    margin: 30px 0 10px 0;
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
