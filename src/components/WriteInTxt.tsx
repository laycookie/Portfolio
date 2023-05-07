"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./WriteInTxt.css";

type Props = {
  text: string;
  className: string;
  aniLength: number;
  SVGUntil: number | null;
};

export default function WriteInTxt({
  text,
  className,
  aniLength,
  SVGUntil = null,
}: Props) {
  const [winWidth, setWinWidth] = React.useState(0);
  const textRef = useCallback(
    (textElement: SVGTextElement) => {
      if (textElement !== null) {
        // Passes animation length & delay to css
        // honestly don't know why I need to multiply by 8, but it works
        textElement.style.setProperty(
          "--ani-length-weighted",
          aniLength * 8 + "ms"
        );
        textElement.style.setProperty("--ani-delay", (SVGUntil ?? 0) + "ms");
      }
    },
    [aniLength, SVGUntil]
  );

  useEffect(() => {
    // Updates window width on resize
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (winWidth > 1023) {
    return (
      <svg className={className} style={{ opacity: "1" }}>
        <text ref={textRef} y="50%" className={"text-line"}>
          {text}
        </text>
      </svg>
    );
  } else {
    return <p className={className}>{text}</p>;
  }
}
