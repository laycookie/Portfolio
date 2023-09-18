"use client";
import React, {ReactNode, Ref, RefObject, useRef, useState} from "react";
import EditElement from "./EditElement";

import "@/styles/blogStyles.css";

type Props = {};

export default function Page({}: Props) {
    const [elements, setElements]
        = useState<ReactNode[]>([]);


    function generateRandomKey() {
        return Math.random().toString(36).slice(2, 11);
    }

    return (
        <main className="defaults contain pt-[10vh]">
            <textarea placeholder="Title" className="w-full title"/>

            <div className="w-full space-y-2">
                {elements.map((element) => element)}
            </div>

            <button
                className="block"
                onClick={() => setElements(prev =>[...prev, <EditElement
                    key={generateRandomKey()}
                />])}
            >+
            </button>
            <button>Publish</button>
        </main>
    );
}
