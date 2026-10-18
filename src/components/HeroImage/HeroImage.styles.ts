import styled from "styled-components";

interface WrapperProps {
  image: string;
}

export const Wrapper = styled.div<WrapperProps>`
  background: ${({ image }) =>
    `linear-gradient(
      to right, rgba(10,10,10,0.95) 0%,
      rgba(10,10,10,0.6) 40%,
      rgba(10,10,10,0.1) 100%
    ),
    linear-gradient(
      to bottom, rgba(10,10,10,0) 40%,
      rgba(10,10,10,0.9) 100%
    ),
    url('${image}'), #0a0a0a`};
  background-size: cover;
  background-position: center top;
  height: 600px;
  position: relative;
  animation: animateHeroimage 1s;
  @keyframes animateHeroimage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  padding: 20px;
  max-width: var(--maxWidth);
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

export const Text = styled.div`
  z-index: 100;
  max-width: 700px;
  position: absolute;
  bottom: 60px;
  margin-right: 20px;
  min-height: 100px;
  color: var(--white);
  h1 {
    font-size: var(--fontSuperBig);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0 0 10px 0;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
    border-left: 4px solid var(--accent);
    padding-left: 16px;
    @media screen and (max-width: 720px) {
      font-size: var(--fontBig);
    }
  }
  p {
    font-size: var(--fontMed);
    color: #ccc;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
    @media screen and (max-width: 720px) {
      font-size: var(--fontSmall);
    }
  }
  @media screen and (max-width: 720px) {
    max-width: 100%;
    bottom: 40px;
  }
`;
