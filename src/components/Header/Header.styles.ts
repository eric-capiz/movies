import styled from 'styled-components';

export const Wrapper = styled.div`
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  padding: 0 20px;
  border-bottom: 1px solid rgba(229, 9, 20, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 16px 0;
  margin: 0 auto;
`;

export const Logo = styled.h2`
  font-size: var(--fontBig);
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
  a {
    color: var(--accent);
    text-decoration: none;
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(229, 9, 20, 0.5);
    transition: text-shadow 0.3s;
    &:hover {
      text-shadow: 0 0 30px rgba(229, 9, 20, 0.8);
    }
  }
  @media screen and (max-width: 650px) {
    font-size: var(--fontMed);
  }
`;

export const TMDBLogoImg = styled.img`
  width: 100px;
  opacity: 0.7;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 500px) {
    width: 80px;
  }
`;
