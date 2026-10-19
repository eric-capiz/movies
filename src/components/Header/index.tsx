import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Wrapper, Content, Logo, TMDBLogoImg } from "./Header.styles";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 140, damping: 22 });

  useMotionValueEvent(smoothY, "change", (v) => {
    setScrolled(v > 32);
  });

  const handleLogoClick = (): void => {
    // Clear session storage when clicking logo
    sessionStorage.removeItem("homeState");
  };

  return (
    <Wrapper
      as={motion.div}
      $scrolled={scrolled}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -70, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.25, 1] }}
    >
      <Content $scrolled={scrolled}>
        <Link
          style={{ textDecoration: "none" }}
          to="/"
          onClick={handleLogoClick}
        >
          <Logo>
            Zeta <span>Movies</span>
          </Logo>
        </Link>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <TMDBLogoImg src={TMDBLogo} alt="rmdb-logo" />
        </a>
      </Content>
    </Wrapper>
  );
};

export default Header;
