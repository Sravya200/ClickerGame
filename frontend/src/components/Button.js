import React from "react";

const Button = ({ onClick }) => {
  return (
    <button
      className="click-button"
      onClick={onClick}
    >
      Click Me!
    </button>
  );
};

export default Button;
