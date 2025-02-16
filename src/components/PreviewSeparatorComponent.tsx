import React from "react";

interface Props {
  sepComp: any;
}

const PreviewSeparatorComponent = ({ sepComp }: Props) => {
  return (
    <>
      <svg
        width="100%"
        height="100"
        viewBox="0 0 500 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 20 C 60 0, 140 40, 230 20"
          stroke="black"
          fill="transparent"
          stroke-width="1"
        />

        <text
          x="250"
          y="30"
          font-family="Arial"
          font-size="20"
          text-anchor="middle"
          fill="black"
        >
          * * *
        </text>

        <path
          d="M 270 20 C 360 40, 440 0, 500 20"
          stroke="black"
          fill="transparent"
          stroke-width="1"
        />
      </svg>
    </>
  );
};

export default PreviewSeparatorComponent;
