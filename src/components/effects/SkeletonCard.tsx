import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  background: #12161f;
  aspect-ratio: 2 / 3;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      transparent 20%,
      rgba(201, 169, 106, 0.12) 40%,
      rgba(245, 240, 232, 0.14) 50%,
      rgba(201, 169, 106, 0.12) 60%,
      transparent 80%
    );
    background-size: 400px 100%;
    animation: skeletonShimmer 1.6s linear infinite;
  }
`;

const SkeletonCard = () => <Card aria-hidden="true" />;

export default SkeletonCard;
