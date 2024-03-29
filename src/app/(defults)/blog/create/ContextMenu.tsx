import {useContext, useEffect, useState} from 'react';
import {BlogBlockTypes} from "@/types/blog";

import {CreatedContentCtx} from "@/app/(defults)/blog/create/createdContentCtx";

type props = {}

export default function ContextMenu({}: props) {
    const {
        selectedBlockIndex,
        setSelectedBlockIndex,
        blocksData,
        setBlocksData,
        contextMenuPosition
    } = useContext(CreatedContentCtx)

    const [type, setType]
        = useState<BlogBlockTypes | null>(null);

    useEffect(() => {
        if (selectedBlockIndex === null) return;
        setType(blocksData[selectedBlockIndex].type ?? null);
    }, [blocksData, selectedBlockIndex]);

    useEffect(() => {
        if (type === null || selectedBlockIndex === null) return;
        setBlocksData(prev => {
            const newBlocksData = [...prev];
            newBlocksData[selectedBlockIndex].type = type;
            return newBlocksData;
        });
    }, [type, selectedBlockIndex, setBlocksData]);

    useEffect(() => {
        function handleContextMenuClosing(event: MouseEvent) {
            const elementsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY);
            if (elementsUnderCursor.includes(
                document.getElementById("context-menu") as HTMLElement)) return;

            setSelectedBlockIndex(null);
            setType(null);
        }

        document.addEventListener("click", handleContextMenuClosing);
        return () => {
            document.removeEventListener("click", handleContextMenuClosing);
        };
    }, [setSelectedBlockIndex]);


    return (
        <div className="fixed z-20" id="context-menu"
             style={{
                 visibility: type !== null ? "visible" : "hidden",
                 left: contextMenuPosition.x,
                 top: contextMenuPosition.y
             }}>
            <ul className="bg-black border-white border-2">
                {(["text", "image", "video", "audio", "code"] as const)
                    .map((item, index) =>
                        <li {...{id: item} as { id: BlogBlockTypes }}
                            key={index}>
                            <button className="pl-2 pr-2 py-1 hover:bg-dark-secondary w-24 text-left
                            flex justify-between"
                                    onClick={() => {
                                        setType(item)
                                    }}>
                                <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                                <p style={{
                                    visibility: item === type ?
                                        "visible" :
                                        "hidden"
                                }}>C</p>
                            </button>
                        </li>
                    )}
                <li>
                    <button className="pl-2 pr-2 py-1 hover:bg-dark-secondary w-24 text-left"
                            onClick={() => {
                                setBlocksData(prev => prev.filter((_, index) => index !== selectedBlockIndex))
                                setSelectedBlockIndex(null);
                                setType(null);
                            }}>
                        <p>Remove</p>
                    </button>
                </li>
            </ul>
        </div>
    );
}