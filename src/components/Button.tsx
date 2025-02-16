import React, { useEffect } from "react";

interface Props {
  children: string;
  symbol: string;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = ({ children, symbol, onClick, color = "primary" }: Props) => {
  if (symbol == "") symbol = children;
  return (
    <>
      <button
        className={"btn btn-" + color}
        onClick={onClick}
        style={{ padding: 0, fontSize: "1.5vw" }}
        data-toggle="tooltip"
        data-placement="top"
        title={children}
      >
        {symbol}
      </button>
    </>
  );
};

export default Button;
