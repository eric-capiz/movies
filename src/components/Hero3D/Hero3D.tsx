import React, { Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HeroScene = React.lazy(() => import("./HeroScene"));

interface Hero3DProps {
  posters: string[];
  fallbackImage: string;
}

/**
 * 3D hero backdrop. Code-split so three.js never touches the initial bundle,
 * unmounted when scrolled out of view, static image for reduced motion.
 */
const Hero3D = ({ posters, fallbackImage }: Hero3DProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const layerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
  };

  if (reduceMotion) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          ...layerStyle,
          backgroundImage: `url('${fallbackImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
    );
  }

  return (
    <div ref={ref} aria-hidden="true" style={layerStyle}>
      {inView && (
        <Suspense fallback={null}>
          <HeroScene posters={posters} />
        </Suspense>
      )}
    </div>
  );
};

export default Hero3D;
