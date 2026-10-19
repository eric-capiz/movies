import React, { useEffect, useRef } from "react";
import {
  motion,
  type Variants,
  useReducedMotion,
  useInView,
  useAnimation,
} from "framer-motion";
import { Wrapper, Content } from "./Grid.styles";
import DecoLineDraw from "../effects/DecoLine";

interface GridProps {
  header: string;
  children: React.ReactNode;
  /** True when the grid's data is loaded. Entrance only plays when ready,
      so a whileInView trigger on an empty container can't get stuck hidden. */
  ready?: boolean;
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

const Grid = ({ header, children, ready = true }: GridProps) => {
  const reduceMotion = useReducedMotion();
  const items = React.Children.toArray(children);

  /* Data-aware entrance: start the staggered reveal only when the container
     is in view AND data is present. A plain whileInView with once:true would
     fire on the empty container during the fetch and freeze cards at
     opacity 0 forever. */
  const controls = useAnimation();
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(contentRef, { once: true, margin: "-40px" });

  useEffect(() => {
    if (inView && ready && items.length > 0) {
      controls.start("show");
    }
  }, [inView, ready, items.length, controls]);

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
          ref={contentRef}
          variants={gridVariants}
          initial="hidden"
          animate={controls}
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
