"use client";
import Style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {};

export default function TypeIn({}: Props) {
  // Animation length in ms
  const aniLength = 2000;
  const text: [string, string, string] = [
    "Hello, my name is",
    " ",
    "Dennis Lonoshchuk",
  ];
  const fullText = text[0] + text[1] + text[2];
  const [displayedText, setDisplayedText] = useState<[string, string, string]>([
    "",
    "",
    "",
  ]);

  useEffect(() => {
    // log test every 10ms 20 times
    const iterAmount = fullText.length; // subtract 1 because we start at 0 in the array
    let nextIter = aniLength / fullText.length;
    let i = 1;
    const interval = setInterval(() => {
      if (i <= text[0].length) {
        setDisplayedText([fullText.slice(0, i), "", ""]);
      } else if (i <= text[0].length + text[1].length) {
        setDisplayedText([
          displayedText[0],
          fullText.slice(text[0].length, i),
          "",
        ]);
      } else if (i <= text[0].length + text[1].length + text[2].length) {
        setDisplayedText([
          displayedText[0],
          displayedText[1],
          fullText.slice(text[0].length + text[1].length, i),
        ]);
      }
      if (i >= iterAmount) {
        clearInterval(interval);
      } else {
        i++;
      }
    }, nextIter);
  }, []);

  return (
    <>
      <h1 className="hidden">{fullText}</h1>
      <p
        className={`font-semibold text-4xl sm:text-6xl md:text-7xl
text-stroke-2 pt-[max(76px,32vh)]`}
      >
        {displayedText[0] + displayedText[1]}
        <Link
          href="/contact"
          className="text-transparent dark:text-stroke-white text-stroke-black text-stroke-2
dark:hover:text-white hover:text-black
transition-all ease-in-out duration-300"
        >
          {displayedText[2]}
        </Link>
      </p>
    </>
  );
}
