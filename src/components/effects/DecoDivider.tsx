import React from "react";
import styled from "styled-components";

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  max-width: var(--maxWidth);
  margin: 44px auto 8px auto;
  padding: 0 20px;
  opacity: 0.9;
`;

const Line = styled.span`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(201, 169, 106, 0.7) 30%,
    rgba(201, 169, 106, 0.7) 70%,
    transparent
  );
`;

const Diamond = styled.span`
  color: var(--accent);
  font-size: 0.9rem;
  text-shadow: 0 0 8px rgba(201, 169, 106, 0.8);
`;

const DecoDivider = () => (
  <Divider aria-hidden="true">
    <Line />
    <Diamond>&#9670;</Diamond>
    <Diamond style={{ fontSize: "0.6rem", opacity: 0.7 }}>&#9670;</Diamond>
    <Diamond>&#9670;</Diamond>
    <Line />
  </Divider>
);

export default DecoDivider;
