import React, { useMemo } from "react";
import styled from "styled-components";

const Field = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 4;
`;

const Ember = styled.span<{
  $left: string;
  $size: string;
  $delay: string;
  $duration: string;
  $blur: string;
  $hue: string;
}>`
  position: absolute;
  left: ${(p) => p.$left};
  bottom: -4vh;
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  border-radius: 50%;
  filter: blur(${(p) => p.$blur});
  background: radial-gradient(
    circle,
    ${(p) => p.$hue} 0%,
    rgba(201, 169, 106, 0.55) 45%,
    transparent 72%
  );
  box-shadow: 0 0 18px 4px rgba(232, 201, 138, 0.35);
  animation: emberRise ${(p) => p.$duration} linear infinite;
  animation-delay: ${(p) => p.$delay};
`;

/**
 * Cinematic gold ember field: large soft bokeh embers drifting upward.
 * Clearly visible, warm, no strobing.
 */
const EmberField = ({ count = 42 }: { count?: number }) => {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const big = i % 3 === 0;
        return {
          id: i,
          left: `${(i * 41.3 + 7) % 100}%`,
          size: big ? `${10 + ((i * 5) % 8)}px` : `${4 + ((i * 7) % 6)}px`,
          blur: big ? `${3 + ((i * 3) % 4)}px` : "1px",
          hue: i % 4 === 0 ? "#ffe9bd" : "#f3d894",
          delay: `${-((i * 1.73) % 14)}s`,
          duration: `${9 + ((i * 7) % 9)}s`,
        };
      }),
    [count]
  );
  return (
    <Field className="ember-field" aria-hidden="true">
      {embers.map((e) => (
        <Ember
          key={e.id}
          $left={e.left}
          $size={e.size}
          $delay={e.delay}
          $duration={e.duration}
          $blur={e.blur}
          $hue={e.hue}
        />
      ))}
    </Field>
  );
};

export default EmberField;
