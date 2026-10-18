import React from "react";
import styled from "styled-components";

const TickerWrap = styled.div`
  overflow: hidden;
  border-top: 1px solid rgba(201, 169, 106, 0.35);
  border-bottom: 1px solid rgba(201, 169, 106, 0.35);
  background: rgba(10, 14, 26, 0.85);
  padding: 10px 0;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 2;
`;

const Track = styled.div`
  display: inline-flex;
  white-space: nowrap;
  animation: marqueeScroll 40s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.span`
  font-family: var(--fontSerif);
  font-size: 0.95rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--accent);
  padding: 0 28px;
  &::after {
    content: "\u2726";
    margin-left: 56px;
    opacity: 0.6;
  }
`;

interface MarqueeProps {
  titles: string[];
}

const Marquee = ({ titles }: MarqueeProps) => {
  if (!titles || titles.length === 0) return null;
  const items = [...titles, ...titles];
  return (
    <TickerWrap aria-hidden="true">
      <Track>
        {items.map((t, i) => (
          <Item key={i}>{t}</Item>
        ))}
      </Track>
    </TickerWrap>
  );
};

export default Marquee;
