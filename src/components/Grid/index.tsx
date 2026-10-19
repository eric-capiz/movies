import React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Wrapper, Content } from "./Grid.styles";
import DecoLineDraw from "../effects/DecoLine";

interface GridProps {
  header: string;
  children: React.ReactNode;
}

/* Masonry-style entrance: cards wipe in with a clip-path reveal + rise,
   staggered so the grid pours onto the screen */
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const cellVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    clipPath: "inset(0 0 100% 0)",
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { type: "spring", stiffness: 170, damping: 20 },
  },
};

const Grid = ({ header, children }: GridProps) => {
  const reduceMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  return (
    <Wrapper>
      <motion.h1
        initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 120, damping: 17 }}
      >
        <DecoLineDraw />
        {header}
      </motion.h1>
      {reduceMotion ? (
        <Content>{children}</Content>
      ) : (
        <Content
          as={motion.div}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map((child, i) => (
            <motion.div key={i} variants={cellVariants}>
              {child}
            </motion.div>
          ))}
        </Content>
      )}
    </Wrapper>
  );
};

export default Grid;
