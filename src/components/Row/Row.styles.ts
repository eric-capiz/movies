import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 0 20px;

  h2 {
    color: var(--white);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 30px 0 10px 0;
    padding-left: 12px;
    border-left: 4px solid var(--accent);
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
  background: rgba(10, 10, 10, 0.9);
  color: var(--white);
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: 1px solid rgba(229, 9, 20, 0.4);

  &:hover {
    background: var(--accent);
    color: var(--white);
    border-color: var(--accent);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.6);
  }

  &:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;
