import React, {useContext, useEffect, useState, useRef} from 'react';
import {CreatedContentCtx} from "@/app/(defults)/blog/create/createdContentCtx";

export default function ImageBlock() {
    const {
        setBlocksData
    } = useContext(CreatedContentCtx)

    const textHtmlRef = useRef<HTMLDivElement | null>(null);

    const [imageName, setImageName]
        = useState<string|null>(null);
    const [imageFile, setImageFile]
        = useState<File|null>(null);

    useEffect(() => {
        const keyOfTheBlock = textHtmlRef.current?.parentElement?.getAttribute("keyval");
        if (!keyOfTheBlock) return
        setBlocksData(prev => {
            const newBlocksData = [...prev];
            const blockIndex = prev.findIndex(element => element.key === keyOfTheBlock);
            if (imageFile === null) {
                newBlocksData[blockIndex].content = null;
            } else {
                newBlocksData[blockIndex].content = {
                    name: imageName,
                    file: imageFile
                };
            }
            return newBlocksData;
        })
    }, [setBlocksData, imageFile, imageName]);

    return (
        <div ref={textHtmlRef} className="w-full">
            <input type={"file"} accept="image/gif, image/jpeg, image/png, image/webp"
                   multiple={false}
                   onChange={(e) => {
                       setImageFile(() => {
                           if (e?.target?.files === null) return null;
                           else return e?.target?.files[0]
                       });
                   }}/>
            <input placeholder="name"
            onChange={(e) => {
                setImageName(e.target.value);
            }}/>
            {imageFile !== null ?
                // This is a local file so no point in optimization
                // eslint-disable-next-line @next/next/no-img-element
                <img className={"w-full"} alt={"image to insert"}
                     src={imageFile ? URL.createObjectURL(imageFile) : undefined}/> :
                null
            }
        </div>
    );
};
