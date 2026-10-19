import React from "react";
import { Wrapper } from "./Button.style";
import Magnetic from "../effects/Magnetic";

interface ButtonProps {
  text: string;
  callback: () => void;
}

const Button = ({ text, callback }: ButtonProps) => (
  <div style={{ display: "flex", justifyContent: "center", margin: "20px auto" }}>
    <Magnetic strength={0.22}>
      <Wrapper
        type="button"
        onClick={callback}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      >
        {text}
      </Wrapper>
    </Magnetic>
  </div>
);

export default Button;
