import React, {createContext} from "react";
import {ElementsData} from "@/types/blog";

export const CreatedContentCtx = createContext({
    blocksData: [],
    setBlocksData: () => {
    },
    selectedBlockIndex: null as number | null,
    setSelectedBlockIndex: () => {
    },
    contextMenuPosition: {x: 0, y: 0},
    setContextMenuPosition: () => {
    },
} as {
    blocksData: ElementsData[],
    setBlocksData: React.Dispatch<React.SetStateAction<ElementsData[]>>
    selectedBlockIndex: number | null,
    setSelectedBlockIndex: React.Dispatch<React.SetStateAction<number | null>>,
    contextMenuPosition: { x: number, y: number },
    setContextMenuPosition: React.Dispatch<React.SetStateAction<{ x: number, y: number }>>
});