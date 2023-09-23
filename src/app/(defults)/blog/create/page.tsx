"use client";
import React, {useState} from "react";
import type {ElementsData} from "@/types/blog";
import EditElement from "./EditElement";
import "@/styles/blogStyles.css";

type Props = {};

export default function Page({}: Props) {


    const [elementsData, setElementData]
        = useState<ElementsData[]>([]);


    function generateRandomKey() {
        return Math.random().toString(36).slice(2, 11);
    }

    return (
        <main className="defaults contain pt-[10vh]">
            <textarea placeholder="Title" className="w-full title"/>


            <div className="w-full space-y-2">
                {elementsData.map((data) => <EditElement
                    id={"BlogCols"}
                    elementsData={elementsData[Number(data.index)]}
                    setElementsIndexes={setElementData}
                    index={data.index}
                    key={data.key}
                />)}
            </div>


            <button
                className="block"
                onClick={() => setElementData(prev => {
                        let maxContinuesNum = 0n;
                        for (const _ in prev) {
                            for (const value of prev) {
                                if (value.index === maxContinuesNum) {
                                    maxContinuesNum++
                                    break
                                }
                            }
                        }

                        return [
                            ...prev,
                            {
                                index: maxContinuesNum,
                                content: "", // this is a default content
                                type: "text", // this is a default type
                                key: generateRandomKey()
                            }
                        ]
                    }
                )}
            >+
            </button>
            <button>Publish</button>
        </main>
    );
}
