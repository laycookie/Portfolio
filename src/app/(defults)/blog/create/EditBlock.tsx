import {ElementsData} from "@/types/blog";
import {useGesture} from "@use-gesture/react";
import React, {useRef, useState} from "react";
import TextBlock from "@/app/(defults)/blog/create/TextBlock";

type props = {
    setBlocksData: React.Dispatch<React.SetStateAction<ElementsData[]>>;
    setSelectedBlockIndex: React.Dispatch<React.SetStateAction<number | null>>;
    setContextMenuPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>;
    index: number;
    keyVal: string;
    children?: React.ReactNode;
}

function EditBlock({setBlocksData, setSelectedBlockIndex, setContextMenuPosition, index, keyVal, children}: props) {
    const thisElement = useRef<HTMLDivElement>(null);
    const attr = {keyval: keyVal}

    function getElementOnPosition({x, y}: { x: number, y: number }) {
        const elementsUnderCursor = document.elementsFromPoint(x, y).filter(element =>
            element !== thisElement.current && element.classList.contains("draggable"));

        if (elementsUnderCursor.length < 1) return null;
        return elementsUnderCursor[0];

    }

    function swapBlocks(elementUnderCursor: Element) {
        setBlocksData(prev => {
                const newBlocksData = [...prev];

                const thisElementIndex = prev[index];
                const elementUnderCursorIndex = prev.find((element) =>
                    element.key === elementUnderCursor.getAttribute("keyval")) as ElementsData;

                // swap
                newBlocksData[index] = elementUnderCursorIndex;
                newBlocksData[prev.indexOf(elementUnderCursorIndex)] = thisElementIndex;

                return newBlocksData;
            }
        )
    }

    const [hoveredOverElements, setHoveredOverElements]
        = useState<Element[]>([])
    const bind = useGesture(
        {
            onDrag: ({down, movement, event}) => {
                if (!thisElement.current) return
                if (event instanceof KeyboardEvent || event instanceof TouchEvent) return
                const elUnderHoveredEl =
                    getElementOnPosition({x: event.clientX, y: event.clientY})

                if (down) {
                    thisElement.current.style.transform = `translateY(${movement[1]}px)`
                    thisElement.current.style.opacity = "0.5";

                    // highlight and clear styles of elements that you are hovering over
                    for (let i = 0; hoveredOverElements.length > i; i++) {
                        (hoveredOverElements[i] as HTMLElement).style.backgroundColor = "#ffffff00";
                    }
                    if (elUnderHoveredEl === null) return;
                    setHoveredOverElements(prev =>
                        (prev.includes(elUnderHoveredEl)) ?
                            [...prev] : [...prev, elUnderHoveredEl]
                    );

                    (elUnderHoveredEl as HTMLElement).style.backgroundColor = "#1f1f2f";

                } else {
                    // clear all styles
                    thisElement.current.style.transform = `translateY(0px)`
                    thisElement.current.style.opacity = "1"
                    for (let i = 0; hoveredOverElements.length > i; i++) {
                        (hoveredOverElements[i] as HTMLElement).style.backgroundColor = "#ffffff00";
                        (hoveredOverElements[i] as HTMLElement).style.opacity = "1";
                    }
                    setHoveredOverElements([])
                    if (elUnderHoveredEl) swapBlocks(elUnderHoveredEl)
                }
            },
            onHover: ({hovering}) => {
                if (!thisElement.current) return
                if (hovering) {
                    thisElement.current.style.backgroundColor = "#1f1f1f"
                } else {
                    thisElement.current.removeAttribute("style");
                }
            },
        }, {}
    )

    return (
        <div className="w-full p-2 rounded-lg flex
        draggable transition-[color,background-color,opacity] "
             ref={thisElement} {...attr}>
            <button {...bind()}
                    className="pr-2"
                    style={{touchAction: "none"}}
                    onContextMenu={(event) => {
                        event.preventDefault();
                        setSelectedBlockIndex(index)
                        setContextMenuPosition({x: event.clientX, y: event.clientY})
                    }}
            >=
            </button>

            {children}

        </div>
    )
}


EditBlock.Text = TextBlock;
export default EditBlock;