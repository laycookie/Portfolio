"use client";
import React, {useState} from "react";
import type {ElementsData} from "@/types/blog";
import "@/styles/blogStyles.css";
import EditBlock from "@/app/(defults)/blog/create/EditBlock";
import ContextMenu from "@/app/(defults)/blog/create/ContextMenu";
import {CreatedContentCtx } from "@/app/(defults)/blog/create/createdContentCtx";

type Props = {};

export default function Page({}: Props) {
    const [blocksData, setBlocksData]
        = useState<ElementsData[]>([]);
    const [contextMenuPosition, setContextMenuPosition]
        = useState({x: 0, y: 0});
    const [selectedBlockIndex, setSelectedBlockIndex]
        = useState<number | null>(null);

    function generateRandomKey() {
        return Math.random().toString(36).slice(2, 11);
    }

    return (
        <CreatedContentCtx.Provider
            value={{
                blocksData,
                setBlocksData,
                selectedBlockIndex,
                setSelectedBlockIndex,
                contextMenuPosition,
                setContextMenuPosition,
            }}
        >
        <main className="defaults contain pt-[10vh]">
            <textarea placeholder="Title" className="w-full title"/>
            <ContextMenu/>
            <div className="w-full space-y-2">
                {blocksData.map((data, index) => {
                    return <EditBlock key={data.key}
                                      keyVal={data.key}
                                      index={index}
                    >
                        {(() => {
                            switch (data.type) {
                                case "text":
                                    return (
                                        <EditBlock.Text/>
                                    )
                                case "image":
                                    return (
                                        <EditBlock.Image/>
                                    )
                                default:
                                    return <p>This block is not implemented</p>
                            }
                        })()}
                    </EditBlock>
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
</CreatedContentCtx.Provider>
    );
}
