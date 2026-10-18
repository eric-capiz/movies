import React from "react";
import { Link } from "react-router-dom";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Wrapper, Content, Logo, TMDBLogoImg } from "./Header.styles";

const Header = () => {
  const handleLogoClick = (): void => {
    // Clear session storage when clicking logo
    sessionStorage.removeItem("homeState");
  };

  return (
    <Wrapper>
      <Content>
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
