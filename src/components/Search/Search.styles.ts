import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  background: transparent;
  padding: 0 20px;
`;

export const Content = styled.div`
  position: relative;
  max-width: 560px;
  width: 100%;
  height: 58px;
  background: var(--cardBg);
  margin: 0 auto;
  border-radius: 999px;
  border: 1px solid rgba(201, 169, 106, 0.35);
  color: var(--white);
  transition: max-width 0.5s cubic-bezier(0.2, 0.8, 0.25, 1), border-color 0.3s,
    box-shadow 0.3s;
  &:focus-within {
    max-width: var(--maxWidth);
    border-color: var(--accent);
    box-shadow:
      0 0 0 2px rgba(201, 169, 106, 0.25),
      0 0 34px rgba(201, 169, 106, 0.28);
  }
  img {
    position: absolute;
    left: 15px;
    top: 14px;
    width: 30px;
    opacity: 0.6;
    filter: sepia(0.6) saturate(1.5) hue-rotate(-15deg);
  }
  input {
    font-size: 20px;
    position: absolute;
    left: 0px;
    margin: 8px 0;
    padding: 0 0 0 60px;
    border: 0;
    width: 95%;
    background: transparent;
    height: 40px;
    color: var(--white);
    outline: none;
    letter-spacing: 1px;
    &::placeholder {
      color: #6b6555;
    }
    :focus {
      outline: none;
    }
    @media screen and (max-width: 720px) {
      font-size: 18px;
    }
  }
`;
