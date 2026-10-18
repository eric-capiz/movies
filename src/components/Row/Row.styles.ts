import styled from "styled-components";

export const Wrapper = styled.div`
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

export const RowContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Scroller = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0 20px 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ThumbWrapper = styled.div`
  flex: 0 0 auto;
  width: 180px;
  @media screen and (max-width: 768px) {
    width: 140px;
  }
`;

export const ArrowButton = styled.button<{ direction: "left" | "right" }>`
  position: absolute;
  top: 40%;
  ${(props) => (props.direction === "left" ? "left: -8px;" : "right: -8px;")}
  transform: translateY(-50%);
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: rgba(28, 28, 28, 0.85);
  color: var(--white);
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: var(--darkGrey);
    transform: translateY(-50%) scale(1.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`;
