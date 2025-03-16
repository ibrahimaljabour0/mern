import React from "react";
import './Button.css'
const Button = ({handleClick}) => {
  return (
    <div class="toggle-switch" >
      <input onClick={handleClick} class="toggle-input" id="toggle" type="checkbox" />
      <label class="toggle-label" for="toggle"></label>
    </div>
  );
};

export default Button;
