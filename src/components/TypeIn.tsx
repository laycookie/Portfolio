"use client";
import Link from "next/link";
import {ReactElement, useEffect, useState} from "react";
import { useInterval } from "src/hooks/setInterval";

type Props = { text: string[]; aniLength: number };

export default function TypeIn({ text, aniLength }: Props) {
  const fullText = text.join("");
  const [delay, setDelay] = useState<number | null>(
    aniLength / fullText.length
  );

  const [displayedText, setDisplayedText] = useState<ReactElement[][]>(() =>
    text.map((stringArr) =>
      stringArr.split("").map((letter) => (
        <span key={crypto.randomUUID()} style={{ opacity: "0" }}>
          {letter}
        </span>
      ))
    )
  );

  useEffect(() => {
    if (text.length <= 0) throw Error("CAN NOT TYPE IN NOTHING");
  }, [text]);

  const [numPrintedLetter, setNumPrintedLetter] = useState<number>(0);
  const [numPrintedStrings, setNumPrintedStrings] = useState<number>(0);
  useInterval(() => {
    if (numPrintedLetter < text[numPrintedStrings].length) {
      // Here is the place where code per character is executed
      setDisplayedText((prevText) => {
        prevText[numPrintedStrings][numPrintedLetter] = (
            <span
                key={prevText[numPrintedStrings][numPrintedLetter].key}
                style={{ opacity: "1.0" }}
            >
            {prevText[numPrintedStrings][numPrintedLetter].props.children}
          </span>
        );
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

  return (
    <>
      <h1 className="pt-[max(76px,32vh)]">
        <span>{displayedText[0]}</span>
        <Link
          href="/contact"
          className="text-stroke
transition-all ease-in-out duration-300"
        >
          {displayedText[1]}
        </Link>
      </h1>
    </>
  );
}
