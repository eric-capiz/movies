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
    &::before {
      content: "";
      width: 34px;
      height: 2px;
      background: linear-gradient(to right, transparent, var(--accent));
    }
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
  /* staggered entrance */
  > * {
    animation: fadeInUp 0.55s ease both;
  }
  > *:nth-child(3n+1) { animation-delay: 0.03s; }
  > *:nth-child(3n+2) { animation-delay: 0.09s; }
  > *:nth-child(3n+3) { animation-delay: 0.15s; }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 1rem;
  }
`;
