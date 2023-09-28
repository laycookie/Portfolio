"use client";
import React, {useState} from "react";
import type {ElementsData} from "@/types/blog";
import "@/styles/blogStyles.css";
import TextBlock from "@/app/(defults)/blog/create/TextBlock";
import EditBlock from "@/app/(defults)/blog/create/EditBlock";
import {BlogBlockTypes} from "@/types/blog";

type Props = {};

export default function Page({}: Props) {


    const [blocksData, setBlocksData]
        = useState<ElementsData[]>([]);


    function generateRandomKey() {
        return Math.random().toString(36).slice(2, 11);
    }

    return (
        <main className="defaults contain pt-[10vh]">
            <textarea placeholder="Title" className="w-full title"/>


            <div className="w-full space-y-2">
                {blocksData.map((data, index) => {
                    switch (data.type) {
                        case "text":
                            return (
                                <EditBlock key={data.key}
                                           keyVal={data.key}
                                           setBlocksData={setBlocksData}
                                           index={index}
                                >
                                    <EditBlock.Text/>
                                </EditBlock>
                            )
                        default:
                            return null
                    }
                })}
            </div>


            <button
                className="block"
                onClick={() => setBlocksData(prev =>
                    [
                        ...prev,
                        {
                            type: "text", // this is a default type
                            key: generateRandomKey()
                        }
                    ]
                )}
            >+
            </button>
            <button>Publish</button>
        </main>
    );
}
