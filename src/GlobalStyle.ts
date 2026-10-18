import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
    --maxWidth: 1280px;
    --white: #f5f5f5;
    --lightGrey: #b3b3b3;
    --medGrey: #353535;
    --darkGrey: #0a0a0a;
    --cardBg: #1a1a1a;
    --accent: #e50914;
    --accentHover: #f6121d;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.8rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }
  * {
    box-sizing: border-box;
    font-family: 'Abel', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: radial-gradient(ellipse at top, #141414 0%, #0a0a0a 60%) fixed, #0a0a0a;
    color: var(--white);
    min-height: 100vh;
    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: var(--white);
      letter-spacing: 0.5px;
    }
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
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
      background: #0a0a0a;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent);
    }
  }
`
