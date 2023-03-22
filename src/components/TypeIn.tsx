"use client";
import Style from "./page.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = { text: string[] };

export default function TypeIn({ text }: Props) {
  // Animation length in ms
  const aniLength = 2000;
  const fullText = text.join("");
  const [displayedText, setDisplayedText] = useState<string[]>(text);

  function useInterval(callback: any, delay: number | null) {
    if (text.length === 0) throw Error("CAN NOT TYPE IN NOTHING");

    const savedCallback: any = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const [wordNum, setWordNum] = useState<number>(0);
  const [stringNum, setStringNum] = useState<number>(0);
  const [delay, setDelay] = useState<number | null>(
    aniLength / fullText.length
  );

  useInterval(() => {
    if (wordNum < text[stringNum].length) {
      const tempNewText = new Array(text.length).fill("");
      tempNewText[stringNum] = text[stringNum].slice(0, wordNum + 1);
      for (let i = 0; i < stringNum; i++) {
        tempNewText[i] = text[i];
      }
      setDisplayedText(tempNewText);

      console.log(text[stringNum][wordNum]);
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
      <h1 className="hidden">{fullText}</h1>
      <p
        className={`font-semibold text-4xl sm:text-6xl md:text-7xl
text-stroke-2 pt-[max(76px,32vh)]`}
      >
        {displayedText[0]}

        <Link
          href="/contact"
          className="text-transparent dark:text-stroke-white text-stroke-black text-stroke-2
dark:hover:text-white hover:text-black
transition-all ease-in-out duration-300"
        >
          {displayedText[1]}
        </Link>
      </p>
    </>
  );
}
