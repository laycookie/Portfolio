"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInterval } from "src/hooks/setInterval";

type Props = { text: string[]; aniLength: number };

export default function TypeIn({ text, aniLength }: Props) {
  const fullText = text.join("");
  const [numPrintedLetter, setNumPrintedLetter] = useState<number>(0);
  const [numPrintedStrings, setNumPrintedStrings] = useState<number>(0);
  const [delay, setDelay] = useState<number | null>(
    aniLength / fullText.length
  );

  const [displayedText, setDisplayedText] = useState<JSX.Element[][]>(() =>
    text.map((stringArr) =>
      stringArr.split("").map((letter, i) => (
        <span key={i} style={{ opacity: "0" }}>
          {letter}
        </span>
      ))
    )
  );

  useEffect(() => {
    if (text.length <= 0) throw Error("CAN NOT TYPE IN NOTHING");
  }, [text]);

  useInterval(() => {
    if (numPrintedLetter < text[numPrintedStrings].length) {
      // Here is the place where code per character is executed
      setDisplayedText((prevText) => {
        let curNewElement = (
          <span
            key={prevText[numPrintedStrings][numPrintedLetter].key}
            style={{ opacity: "1.0" }}
          >
            {prevText[numPrintedStrings][numPrintedLetter].props.children}
          </span>
        );
        prevText[numPrintedStrings][numPrintedLetter] = curNewElement;
        return prevText;
      });

      setNumPrintedLetter(numPrintedLetter + 1);
    } else {
      // subtract one to compensate for 0 index
      if (numPrintedStrings >= text.length - 1) {
        setDelay(null);
      } else {
        setNumPrintedLetter(0);
        setNumPrintedStrings(numPrintedStrings + 1);
      }
    }
  }, delay);

  useEffect(() => {
    console.log("displayedText", displayedText);
  }, [displayedText]);

  return (
    <>
      <h1 className={`text-stroke-2 pt-[max(76px,32vh)]`}>
        {displayedText[0]}

        <Link
          href="/contact"
          className="text-transparent dark:text-stroke-white text-stroke-black text-stroke-2
dark:hover:text-white hover:text-black
transition-all ease-in-out duration-300"
        >
          {displayedText[1]}
        </Link>
      </h1>
    </>
  );
}
