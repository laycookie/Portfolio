"use client";
import React, { useLayoutEffect } from "react";
import "./WriteInTxt.css";

type Props = {
  text: string;
  className: string;
  SVGUntil?: number;
};

export default function WriteInTxt({ text, className }: Props) {
  const [winWidth, setWinWidth] = React.useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (winWidth > 1023) {
    return (
      <svg className={className + " text-line"}>
        <text y="50%">{text}</text>
      </svg>
    );
  } else {
    return <p className={className + " text-line"}>{text}</p>;
  }
}
