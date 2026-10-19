import styled from 'styled-components';

export const Wrapper = styled.div`
  color: var(--white);
  background: var(--darkGrey);
  border-radius: 20px;
  padding: 5px;
  text-align: center;
  h3 {
    margin: 10px 0 0 0;
  }
  p {
    margin: 5px 0;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.25, 1), filter 0.4s ease;
  ${Wrapper}:hover & {
    transform: scale(1.045);
    filter: brightness(1.1) saturate(1.05);
  }
`;