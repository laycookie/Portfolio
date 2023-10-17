import {useContext, useRef} from 'react';
import {CreatedContentCtx} from "@/app/(defults)/blog/create/createdContentCtx";

type props = {}
export default function TextBlock({}: props) {
    const textHtmlRef = useRef<HTMLDivElement>(null);

    const {
        setBlocksData
    } = useContext(CreatedContentCtx)

    return (
        <span ref={textHtmlRef} className="w-full block" contentEditable
              onInput={() => {
                  const keyOfTheBlock = textHtmlRef.current?.parentElement?.getAttribute("keyval");
                  if (!keyOfTheBlock) return
                    setBlocksData(prev => {
                        const newBlocksData = [...prev];
                        const blockIndex = prev.findIndex(element => element.key === keyOfTheBlock);
                        newBlocksData[blockIndex].content = textHtmlRef.current?.innerHTML as string;
                        return newBlocksData;
                    })
        }}/>
    );
};

