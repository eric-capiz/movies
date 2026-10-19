import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;
  h1 {
    font-family: var(--fontSerif);
    color: var(--white);
    font-weight: 700;
    letter-spacing: 2px;
    font-size: 1.7rem;
    margin: 30px 0 20px 0;
    display: flex;
    align-items: center;
    gap: 14px;
    &::after {
      content: "\u2726";
      color: var(--accent);
      font-size: 0.85rem;
    }
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1.5rem;
  perspective: 1200px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 1rem;
  }
`;
