import React, { useMemo } from "react";
import styled from "styled-components";

const DustLayer = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 5;
`;

const Particle = styled.span<{
  $left: string;
  $bottom: string;
  $size: string;
  $delay: string;
  $duration: string;
}>`
  position: absolute;
  left: ${(p) => p.$left};
  bottom: ${(p) => p.$bottom};
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  border-radius: 50%;
  background: radial-gradient(circle, #f3e2b8 0%, rgba(201, 169, 106, 0.4) 60%, transparent 70%);
  animation: floatDust ${(p) => p.$duration} ease-in infinite;
  animation-delay: ${(p) => p.$delay};
`;

const GoldDust = ({ count = 22 }: { count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37.7 + 13) % 100}%`,
        bottom: `${(i * 53.3 + 7) % 40}%`,
        size: `${3 + ((i * 7) % 5)}px`,
        delay: `${-((i * 1.37) % 9)}s`,
        duration: `${7 + ((i * 3) % 6)}s`,
      })),
    [count]
  );
  return (
    <DustLayer className="gold-dust" aria-hidden="true">
      {particles.map((p) => (
        <Particle
          key={p.id}
          $left={p.left}
          $bottom={p.bottom}
          $size={p.size}
          $delay={p.delay}
          $duration={p.duration}
        />
      ))}
    </DustLayer>
  );
};

export default GoldDust;
