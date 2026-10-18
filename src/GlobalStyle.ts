import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
    --maxWidth: 1280px;
    --white: #f5f0e8;
    --lightGrey: #b8b0a0;
    --medGrey: #2a2f3d;
    --darkGrey: #0a0e1a;
    --cardBg: #12161f;
    --accent: #c9a96a;
    --accentHover: #e0c088;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.8rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
    --fontSerif: 'Playfair Display', Georgia, serif;
  }
  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #0a0e1a;
    color: var(--white);
    min-height: 100vh;
    overflow-x: hidden;
    /* gold sheen at top + vignette */
    background-image:
      radial-gradient(ellipse at 50% 0%, rgba(201, 169, 106, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%);
    background-attachment: fixed;
    h1 {
      font-family: var(--fontSerif);
      font-size: 2rem;
      font-weight: 700;
      color: var(--white);
      letter-spacing: 0.5px;
    }
    h2, h3 {
      font-family: var(--fontSerif);
      font-weight: 600;
    }
    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: 1rem;
      color: var(--white);
    }
    a {
      color: var(--white);
      text-decoration: none;
    }
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #0a0e1a;
    }
    ::-webkit-scrollbar-thumb {
      background: #2a2f3d;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }
    ::selection {
      background: rgba(201, 169, 106, 0.35);
      color: #fff8ea;
    }
  }

  /* ---------- keyframes ---------- */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes kenburns {
    0% { transform: scale(1) translate(0, 0); }
    100% { transform: scale(1.12) translate(-1.5%, 1%); }
  }
  @keyframes heroCrossfade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmerSweep {
    0% { transform: translateX(-120%) skewX(-18deg); }
    100% { transform: translateX(240%) skewX(-18deg); }
  }
  @keyframes floatDust {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.9; }
    90% { opacity: 0.5; }
    100% { transform: translateY(-110px) translateX(24px); opacity: 0; }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 106, 0.45), 0 0 24px rgba(201, 169, 106, 0.25); }
    50% { box-shadow: 0 0 0 10px rgba(201, 169, 106, 0), 0 0 40px rgba(201, 169, 106, 0.45); }
  }
  @keyframes letterReveal {
    from { opacity: 0; transform: translateY(0.6em) rotate(4deg); }
    to { opacity: 1; transform: translateY(0) rotate(0); }
  }
  @keyframes popIn {
    0% { transform: scale(0.4); }
    60% { transform: scale(1.35); }
    100% { transform: scale(1); }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes auroraDrift {
    0%, 100% { transform: translateX(-8%) rotate(-2deg); opacity: 0.55; }
    50% { transform: translateX(8%) rotate(2deg); opacity: 0.9; }
  }
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes blurReveal {
    from { opacity: 0; filter: blur(12px); transform: translateY(16px); }
    to { opacity: 1; filter: blur(0); transform: translateY(0); }
  }
  @keyframes skeletonShimmer {
    from { background-position: -400px 0; }
    to { background-position: 400px 0; }
  }

  /* ---------- film grain overlay ---------- */
  .film-grain {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 9990;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ---------- aurora light streaks ---------- */
  .aurora {
    pointer-events: none;
    position: fixed;
    top: -20%;
    left: -10%;
    width: 120%;
    height: 60%;
    z-index: 0;
    overflow: hidden;
    opacity: 0.5;
  }
  .aurora span {
    position: absolute;
    top: 0;
    width: 34%;
    height: 100%;
    filter: blur(90px);
    animation: auroraDrift 18s ease-in-out infinite;
  }
  .aurora span:nth-child(1) {
    left: 8%;
    background: linear-gradient(to bottom, rgba(201,169,106,0.16), transparent 70%);
  }
  .aurora span:nth-child(2) {
    left: 42%;
    background: linear-gradient(to bottom, rgba(224,192,136,0.10), transparent 70%);
    animation-delay: -6s;
  }
  .aurora span:nth-child(3) {
    left: 68%;
    background: linear-gradient(to bottom, rgba(160,120,60,0.14), transparent 70%);
    animation-delay: -12s;
  }

  /* ---------- gold gradient text ---------- */
  .gold-text {
    background: linear-gradient(105deg, #8a6a3b 0%, #c9a96a 30%, #f3e2b8 50%, #c9a96a 70%, #8a6a3b 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ---------- custom cursor glow (desktop only) ---------- */
  .cursor-glow {
    display: none;
  }
  @media (pointer: fine) {
    .cursor-glow {
      display: block;
      pointer-events: none;
      position: fixed;
      width: 320px;
      height: 320px;
      margin: -160px 0 0 -160px;
      border-radius: 50%;
      z-index: 9991;
      background: radial-gradient(circle, rgba(201,169,106,0.10) 0%, transparent 60%);
      transform: translate3d(0, 0, 0);
    }
  }

  /* ---------- reduced motion ---------- */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .aurora, .film-grain, .cursor-glow, .gold-dust { display: none !important; }
  }
`
