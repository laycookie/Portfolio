import "@/styles/blogStyles.css";
import {useDrag} from "@use-gesture/react";
import React from "react";
import {ElementsData} from "@/types/blog.d";

type Props = {
    index: bigint;
    id: string;
    elementsData: ElementsData;
    setElementsIndexes: React.Dispatch<React.SetStateAction<ElementsData[]>>;
};

export default function EditElement({index, id, elementsData, setElementsIndexes}: Props) {
    // const [contents, setContents]
    //     = React.useState<string>(elementsData.content);
    //
    // const myAttr = {"index": index, "draggableid": id};
    // const bind = useDrag(({active, movement}) => {
    //     if (active) {
    //         console.log(movement);
    //     } else {
    //         console.log("not dragging");
    //     }
    // }, {});
    //
    // return (
    //     <div className="flex draggable" {...myAttr} {...bind()}>
    //         <button>=</button>
    //         <textarea
    //             value={contents}
    //             onChange={(e) => {
    //                 setContents(e.target.value);
    //             }}
    //             className="w-full"
    //         ></textarea>
    //     </div>
    // );
    return <div></div>
}
