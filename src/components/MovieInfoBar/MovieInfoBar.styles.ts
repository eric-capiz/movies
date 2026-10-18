import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  background: #0a0e1a;
  border-top: 1px solid rgba(201, 169, 106, 0.4);
  border-bottom: 1px solid rgba(201, 169, 106, 0.4);
  box-shadow: 0 1px 0 rgba(201, 169, 106, 0.15), 0 -1px 0 rgba(201, 169, 106, 0.15);
  padding: 20px;
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  width: 100%;
  margin: 0 auto;
  .column {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--cardBg);
    border: 1px solid rgba(201, 169, 106, 0.25);
    border-radius: 4px;
    margin: 0 10px;
    flex: 1;
    padding: 12px;
    position: relative;
    transition: border-color 0.3s, box-shadow 0.3s;
    &:hover {
      border-color: rgba(201, 169, 106, 0.6);
      box-shadow: 0 0 16px rgba(201, 169, 106, 0.15);
    }
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 768px) {
    display: block;
    .column {
      margin: 10px 0;
    }
  }
`;
