import React, { useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

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

const Track = styled(motion.div)`
  display: inline-flex;
  white-space: nowrap;
  will-change: transform;
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

const BASE_PX_PER_SEC = 42;

/**
 * Cinema ticker. Scroll velocity feeds into the ticker speed through a
 * spring, so fast scrolling gives the reel a brief push. Pauses on hover.
 */
const Marquee = ({ titles }: MarqueeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 55, stiffness: 380 });
  /* scrolling fast briefly multiplies ticker speed; direction-agnostic */
  const boost = useTransform(smoothVelocity, (v) => Math.min(Math.abs(v) / 2600, 2.4));

  useAnimationFrame((_, delta) => {
    if (reduceMotion || hovering.current) return;
    const speed = BASE_PX_PER_SEC * (1 + boost.get());
    const half = trackRef.current ? trackRef.current.scrollWidth / 2 : 0;
    let nx = x.get() - (speed * delta) / 1000;
    if (half > 0 && nx <= -half) nx += half;
    x.set(nx);
  });

  if (!titles || titles.length === 0) return null;
  const items = [...titles, ...titles];

  return (
    <TickerWrap
      aria-hidden="true"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <Track ref={trackRef} style={reduceMotion ? undefined : { x }}>
        {items.map((t, i) => (
          <Item key={i}>{t}</Item>
        ))}
      </Track>
    </TickerWrap>
  );
};

export default Marquee;
