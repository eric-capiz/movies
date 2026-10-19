import React, { useState, useEffect, useRef } from "react";
import searchIcon from "../../images/search-icon.svg";
import { Wrapper, Content } from "./Search.styles";
import Magnetic from "../effects/Magnetic";

// void menas function does not return anything

interface SearchProps {
  setSeachTerm: (term: string) => void;
}

const Search = ({ setSeachTerm }: SearchProps) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSeachTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSeachTerm, state]);

  return (
    <Wrapper>
      <Magnetic
        strength={0.12}
        className="search-magnetic"
        style={{ display: "block", width: "100%", maxWidth: "var(--maxWidth)", margin: "0 auto" }}
      >
        <Content>
          <img src={searchIcon} alt="search-icon" />
          <input
            type="text"
            placeholder="Search Movies..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setState(e.currentTarget.value)
            }
            value={state}
          />
        </Content>
      </Magnetic>
    </Wrapper>
  );
};

export default Search;
