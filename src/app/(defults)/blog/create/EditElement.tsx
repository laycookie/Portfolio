import "@/styles/blogStyles.css";
import {useDrag} from "@use-gesture/react";
import React, {useRef} from "react";
import type {ElementsData} from "@/types/blog.d";
import {bigint} from "zod";

type Props = {
    index: bigint;
    id: string;
    elementsData: ElementsData;
    setElementsIndexes: React.Dispatch<React.SetStateAction<ElementsData[]>>;
};

export default function EditElement({index, id, elementsData, setElementsIndexes}: Props) {
    const thisElement =
        useRef<HTMLDivElement>(null)
    const [contents, setContents]
        = React.useState<string>(elementsData.content);

    const myAttr = {"index": index, "draggableid": id};
    const drag = useDrag(({active, movement, event}) => {
        if (!thisElement.current) return;
        const thisElementCur = thisElement.current;
        if (active) {
            thisElementCur.style.transform
                = `translate(0px, ${movement[1]}px)`;
            thisElementCur.style.opacity = "0.5";
        } else {
            thisElementCur.removeAttribute("style");

            if (event instanceof TouchEvent ||
                event instanceof KeyboardEvent) return;
            const draggableElementsOnCurser = document.elementsFromPoint(event.clientX, event.clientY).filter((element) =>
                element.getAttribute("draggableid") === id && element !== thisElementCur
            )
            if (draggableElementsOnCurser.length < 1) return;
            setElementsIndexes(prev => {
                const newElementsData = [...prev];

                const el1
                    = newElementsData.findIndex((element) => element.index === index);
                const selectedElementIndex = draggableElementsOnCurser[0].getAttribute("index");
                if (!selectedElementIndex) throw new Error("temp is null");
                const el2
                    = newElementsData.findIndex((element) => element.index === BigInt(selectedElementIndex));

                const temp = newElementsData[el1];
                newElementsData[el1] = newElementsData[el2];
                newElementsData[el2] = temp;

                return newElementsData;
            })
        }
    }, {});


    return (
        <div className="flex px-1 py-2" {...myAttr} ref={thisElement}>
            <button {...drag()} className="draggable">=</button>
            <textarea
                value={contents}
                onChange={(e) => {
                    setContents(e.target.value);
                }}
                className="w-full"
            ></textarea>
        </div>
    );
}
