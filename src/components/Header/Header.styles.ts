import styled from 'styled-components';

export const Wrapper = styled.div`
  background: rgba(10, 14, 26, 0.96);
  backdrop-filter: blur(10px);
  padding: 0 20px;
  border-bottom: 1px solid var(--accent);
  box-shadow: 0 1px 0 rgba(201, 169, 106, 0.25), 0 4px 24px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 14px 0;
  margin: 0 auto;
`;

export const Logo = styled.h2`
  font-family: var(--fontSerif);
  font-size: var(--fontBig);
  font-weight: 800;
  letter-spacing: 4px;
  margin: 0;
  color: var(--white);
  text-transform: uppercase;
  transition: color 0.3s;
  span {
    color: var(--accent);
  }
  &:hover {
    color: var(--accent);
  }
  @media screen and (max-width: 650px) {
    font-size: var(--fontMed);
    letter-spacing: 2px;
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
