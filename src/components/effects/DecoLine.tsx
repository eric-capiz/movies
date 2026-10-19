import { motion } from "framer-motion";
import styled from "styled-components";

/**
 * Deco line that draws itself (scaleX 0 -> 1) when scrolled into view.
 * Use as the leading ornament in section headers.
 */
const DecoLine = styled(motion.span)`
  display: inline-block;
  width: 34px;
  height: 2px;
  flex: 0 0 auto;
  background: linear-gradient(to right, transparent, var(--accent));
  transform-origin: left center;
`;

export const DecoLineDraw = () => (
  <DecoLine
    aria-hidden="true"
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ type: "spring", stiffness: 110, damping: 19 }}
  />
);

export default DecoLineDraw;
