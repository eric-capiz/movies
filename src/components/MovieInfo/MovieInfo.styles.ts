import styled from "styled-components";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
  background: #000;
  animation: animateMovieinfo 1s;
  @keyframes animateMovieinfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

/* Backdrop sits on its own layer so it can parallax slower than the content.
   Slow cinematic push-in on load. */
export const BackdropLayer = styled.div<{ $backdrop: string }>`
  position: absolute;
  inset: -12% 0;
  background: ${({ $backdrop }) =>
    $backdrop ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${$backdrop}')` : "#000"};
  background-size: cover;
  background-position: center;
  will-change: transform;
  animation: backdropZoom 9s ease-out both;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  background: rgb(0, 0, 0, 0.7);
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }
`;

export const RatingBar = styled.div`
  margin-top: 10px;
  width: 120px;
  height: 4px;
  border-radius: 2px;
  background: rgba(201, 169, 106, 0.18);
  overflow: hidden;
  span {
    display: block;
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(to right, #8a6a3b, var(--accent), #f3e2b8);
    box-shadow: 0 0 8px rgba(201, 169, 106, 0.55);
    /* glow pulse once the bar lands */
    animation: glowPulse 1.6s ease-in-out 1.1s 2;
  }
`;

export const Text = styled.div`
  width: 100%;
  padding: 20px 40px;
  color: var(--white);
  overflow: hidden;
  .rating-director {
    display: flex;
    justify-content: flex-start;
  }
  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: #fff;
    color: #000;
    font-weight: 800;
    border-radius: 25px;
    margin: 0px 0 0 0;
  }
  .director {
    margin: 0 0 0 40px;
    p {
      margin: 0;
    }
  }
  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;
