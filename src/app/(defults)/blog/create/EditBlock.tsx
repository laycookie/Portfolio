import {BlogBlockTypes, ElementsData} from "@/types/blog";
import {useDrag, useGesture, useHover} from "@use-gesture/react";
import {useRef} from "react";
import TextBlock from "@/app/(defults)/blog/create/TextBlock";

type props = {
    setBlocksData: React.Dispatch<React.SetStateAction<ElementsData[]>>;
    index: number;
    keyVal: string;
    children?: React.ReactNode;
}

function EditBlock({setBlocksData, index, keyVal, children}: props) {
    const thisElement = useRef<HTMLDivElement>(null);
    const attr = {keyval: keyVal}

    function swapBlocks(event: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent) {
        if (event instanceof KeyboardEvent || event instanceof TouchEvent) return

        const elementsUnderCursor = document.elementsFromPoint(event.clientX, event.clientY).filter(element =>
            element !== thisElement.current && element.classList.contains("draggable"));
        if (elementsUnderCursor.length < 1) return
        const elementUnderCursor = elementsUnderCursor[0];

        setBlocksData(prev => {
                const newBlocksData = [...prev];

                const thisElementIndex = prev[index];
                const elementUnderCursorIndex = prev.find((element, index) =>
                    element.key === elementUnderCursor.getAttribute("keyval")) as ElementsData;

                // swap
                newBlocksData[index] = elementUnderCursorIndex;
                newBlocksData[prev.indexOf(elementUnderCursorIndex)] = thisElementIndex;

                return newBlocksData;
            }
        )
    }

    const bind = useGesture(
        {
            onDrag: ({down, movement, event}) => {
                if (!thisElement.current) return
                if (down) {
                    thisElement.current.style.transform = `translateY(${movement[1]}px)`
                    thisElement.current.style.opacity = "0.5"
                } else {
                    thisElement.current.style.transform = `translateY(0px)`
                    thisElement.current.style.opacity = "1"
                    swapBlocks(event)
                }
            },
            onHover: ({hovering}) => {
                if (!thisElement.current) return
                if (hovering) {
                    thisElement.current.style.backgroundColor = hovering ? "red" : "white";
                } else {
                    thisElement.current.removeAttribute("style");
                }
            },
        }, {}
    )

    return (
        <div className="w-full h-32 p-2 rounded-lg flex
        draggable transition-colors"
             ref={thisElement} {...attr}>
            <button {...bind()}
                    className="pr-2"
                    style={{touchAction: "none"}}>=
            </button>
            {children}
        </div>
    )
};


EditBlock.Text = TextBlock;
export default EditBlock;