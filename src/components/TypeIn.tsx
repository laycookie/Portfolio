"use client";
import Style from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useInterval } from "src/hooks/setInterval";

type Props = { text: string[]; aniLength: number };

export default function TypeIn({ text, aniLength }: Props) {
  // Animation length in ms
  const fullText = text.join("");
  const [displayedText, setDisplayedText] = useState<string[]>(text);
  const [wordNum, setWordNum] = useState<number>(0);
  const [stringNum, setStringNum] = useState<number>(0);
  const [delay, setDelay] = useState<number | null>(
    aniLength / fullText.length
  );

  useEffect(() => {
    if (text.length <= 0)
      throw Error(
        "CAN NOT TYPE IN NOTHING (Latterly no point in fixing error in this case just dont use this element if you don't want anything typed in.) "
      );
  }, [text]);

  useInterval(() => {
    if (wordNum < text[stringNum].length) {
      const tempNewText = new Array(text.length).fill("");
      tempNewText[stringNum] = text[stringNum].slice(0, wordNum + 1);
      // writes the strings that where already printed
      for (let i = 0; i < stringNum; i++) {
        tempNewText[i] = text[i];
      }
      setDisplayedText(tempNewText);
      setWordNum(wordNum + 1);
    } else {
      // subtract one to compensate for 0 index
      if (stringNum >= text.length - 1) {
        setDelay(null);
      } else {
        setWordNum(0);
        setStringNum(stringNum + 1);
      }
    }
  }, delay);

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
