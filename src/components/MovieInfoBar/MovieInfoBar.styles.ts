import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  background: #0a0a0a;
  border-top: 1px solid rgba(229, 9, 20, 0.2);
  border-bottom: 1px solid rgba(229, 9, 20, 0.2);
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
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    margin: 0 10px;
    flex: 1;
    padding: 12px;
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
