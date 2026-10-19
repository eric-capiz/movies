import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  max-width: var(--maxWidth);
  margin: 48px auto 10px auto;
  padding: 0 20px;
  opacity: 0.95;
`;

const Line = styled(motion.span)`
  flex: 1;
  height: 1px;
  transform-origin: center;
  background: linear-gradient(
    to right,
    transparent,
    rgba(201, 169, 106, 0.7) 30%,
    rgba(201, 169, 106, 0.7) 70%,
    transparent
  );
`;

const Diamond = styled(motion.span)`
  color: var(--accent);
  font-size: 0.9rem;
  text-shadow: 0 0 8px rgba(201, 169, 106, 0.8);
  display: inline-block;
`;

/**
 * Section divider that draws itself on scroll: lines grow outward,
 * diamonds spin in with a pop. Pure spectacle between sections.
 */
const DecoDivider = () => (
  <Divider aria-hidden="true">
    <Line
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.25, 1] }}
    />
    {[0, 1, 2].map((i) => (
      <Diamond
        key={i}
        style={i === 1 ? { fontSize: "0.6rem", opacity: 0.7 } : undefined}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: i === 1 ? 0.7 : 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 14,
          delay: 0.45 + i * 0.12,
        }}
      >
        &#9670;
      </Diamond>
    ))}
    <Line
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.25, 1] }}
    />
  </Divider>
);

export default DecoDivider;
