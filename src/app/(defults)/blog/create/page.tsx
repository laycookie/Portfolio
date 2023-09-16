"use client";
import { ReactNode, useRef, useState } from "react";
import ElementEdit from "./ElementEdit";

import "@/styles/blogStyles.css";

type Props = {};

export default function Page({}: Props) {
  const [elements, setElements] = useState<ReactNode[]>([]);

  return (
    <main className="defaults contain pt-[10vh]">
      <textarea placeholder="Title" className="w-full title" />

      <div className="w-full space-y-2">
        {elements.map((element) => element)}
      </div>

      <button
        className="block"
        onClick={() => {
          setElements((prev) => [
            ...prev,
            <ElementEdit key={window.crypto.randomUUID()} />,
          ]);
        }}
      >
        +
      </button>
      <button>Publish</button>
    </main>
  );
}
