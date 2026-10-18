import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;
  h1 {
    color: var(--white);
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin: 30px 0 20px 0;
    padding-left: 12px;
    border-left: 4px solid var(--accent);
  }
  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1.5rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: 1rem;
  }
`;
