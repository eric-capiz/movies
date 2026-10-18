import styled from 'styled-components';

export const Spinner = styled.div`
  border: 5px solid rgba(201, 169, 106, 0.15);
  border-top: 5px solid var(--accent);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;
  box-shadow: 0 0 16px rgba(201, 169, 106, 0.25);
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
