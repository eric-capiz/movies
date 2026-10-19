import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Stage, Ring, Slot, PosterFrame, StaticArc } from "./HeroCarousel.styles";

interface HeroCarouselProps {
  posters: string[];
}

const COUNT = 5;
const DEG_PER_SEC = 7;

/**
 * CSS-3D orbiting poster carousel. A true 3D ring (rotateY + translateZ)
 * that auto-rotates continuously, swings dramatically with the mouse,
 * and flies posters in with spring physics on load.
 * Plain <img> tags — reliable, no WebGL texture issues.
 */
const HeroCarousel = ({ posters }: HeroCarouselProps) => {
  const reduceMotion = useReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ swing: 0, tilt: 0 });
  const current = useRef({ swing: 0, tilt: 0, angle: 0 });

  const urls = posters.slice(0, COUNT);
  while (urls.length < COUNT && urls.length > 0) urls.push(urls[urls.length % urls.length]);

  const radius = typeof window !== "undefined" ? Math.min(430, window.innerWidth * 0.36) : 380;

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      // dramatic swing: full pointer travel rotates the ring ±48deg and tilts ±14deg
      target.current.swing = nx * 48;
      target.current.tilt = -ny * 14;
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const c = current.current;
      const t = target.current;
      c.angle = (c.angle + DEG_PER_SEC * dt) % 360;
      // smooth lerp toward pointer target
      const k = 1 - Math.exp(-3.2 * dt);
      c.swing += (t.swing - c.swing) * k;
      c.tilt += (t.tilt - c.tilt) * k;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `rotateY(${c.angle + c.swing}deg) rotateX(${c.tilt}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  if (reduceMotion || urls.length === 0) {
    return (
      <StaticArc aria-hidden="true">
        {urls.slice(0, 3).map((u, i) => (
          <img key={i} src={u} alt="" loading="eager" />
        ))}
      </StaticArc>
    );
  }

  return (
    <Stage aria-hidden="true">
      <Ring ref={ringRef}>
        {urls.map((url, i) => (
          <Slot key={`${url}-${i}`} $angle={i * (360 / COUNT)} $radius={radius}>
            <motion.div
              initial={{ opacity: 0, scale: 0.45, y: 160 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 13,
                delay: 0.25 + i * 0.1,
              }}
            >
              <PosterFrame>
                <div className="bob" style={{ animationDelay: `${i * 0.9}s` }}>
                  <img src={url} alt="" loading="eager" draggable={false} />
                </div>
              </PosterFrame>
            </motion.div>
          </Slot>
        ))}
      </Ring>
    </Stage>
  );
};

export default HeroCarousel;
