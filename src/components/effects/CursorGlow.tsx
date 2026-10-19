import React, { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let x = -400;
    let y = -400;
    let gx = -400;
    let gy = -400;
    let dx = -400;
    let dy = -400;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest?.("a, button, input, [role='button']");
    };

    const loop = () => {
      // soft ambient glow trails lazily
      gx += (x - gx) * 0.12;
      gy += (y - gy) * 0.12;
      // precise dot tracks tightly and blooms over interactive elements
      dx += (x - dx) * 0.35;
      dy += (y - dy) * 0.35;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      }
      if (dotRef.current) {
        const s = hovering ? 2.6 : 1;
        dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${s})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CursorGlow;
