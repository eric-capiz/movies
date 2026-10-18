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
  max-width: var(--maxWidth);
  width: 100%;
  height: 55px;
  background: var(--cardBg);
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--white);
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus-within {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(229, 9, 20, 0.3), 0 0 20px rgba(229, 9, 20, 0.2);
  }
  img {
    position: absolute;
    left: 15px;
    top: 14px;
    width: 30px;
    opacity: 0.6;
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
    &::placeholder {
      color: #666;
    }
    :focus {
      outline: none;
    }
    @media screen and (max-width: 720px) {
      font-size: 18px;
    }
  }
`;
