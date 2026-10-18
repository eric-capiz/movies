import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: transparent;
  width: 25%;
  min-width: 200px;
  height: 60px;
  border-radius: 2px;
  color: var(--accent);
  border: 1px solid var(--accent);
  font-size: var(--fontMed);
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin: 20px auto;
  transition: all 0.3s;
  outline: none;
  cursor: pointer;
  :hover {
    background: rgba(201, 169, 106, 0.12);
    color: var(--accentHover);
    border-color: var(--accentHover);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 169, 106, 0.25);
  }
  :active {
    transform: translateY(0);
  }
`;
