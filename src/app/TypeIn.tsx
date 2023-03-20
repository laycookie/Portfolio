"use client";
import Style from "./page.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

  function useInterval(callback: any, delay: number | null) {
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

  const iterAmount = fullText.length;
  const [iter, setIter] = useState<number>(1);
  const [delay, setDelay] = useState<number | null>(
    aniLength / fullText.length
  );
  useInterval(() => {
    if (iter <= text[0].length) {
      setDisplayedText([fullText.slice(0, iter), "", ""]);
    } else if (iter <= text[0].length + text[1].length) {
      setDisplayedText([
        displayedText[0],
        fullText.slice(text[0].length, iter),
        "",
      ]);
    } else if (iter <= text[0].length + text[1].length + text[2].length) {
      setDisplayedText([
        displayedText[0],
        displayedText[1],
        fullText.slice(text[0].length + text[1].length, iter),
      ]);
    }
    if (iter >= iterAmount) {
      console.log("loop stop");
      setDelay(null);
    } else {
      setIter(iter + 1);
    }
  }, delay);

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
