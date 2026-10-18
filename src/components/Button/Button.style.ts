import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: var(--accent);
  width: 25%;
  min-width: 200px;
  height: 60px;
  border-radius: 4px;
  color: var(--white);
  border: 0;
  font-size: var(--fontMed);
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 20px auto;
  transition: all 0.3s;
  outline: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
  :hover {
    background: var(--accentHover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.5);
  }
  :active {
    transform: translateY(0);
  }
`;
