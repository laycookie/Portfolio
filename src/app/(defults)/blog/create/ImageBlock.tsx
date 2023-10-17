import React, {useContext, useEffect, useState, useRef} from 'react';
import {CreatedContentCtx} from "@/app/(defults)/blog/create/createdContentCtx";

export default function ImageBlock() {
    const {
        setBlocksData
    } = useContext(CreatedContentCtx)

    const textHtmlRef = useRef<HTMLDivElement|null>(null);

    const [uploadedImage, setUploadedImage]
        = useState<null | File>(null);

    useEffect(() => {
        const keyOfTheBlock = textHtmlRef.current?.parentElement?.getAttribute("keyval");
        if (!keyOfTheBlock) return
        setBlocksData(prev => {
            const newBlocksData = [...prev];
            const blockIndex = prev.findIndex(element => element.key === keyOfTheBlock);
            newBlocksData[blockIndex].content = uploadedImage;
            return newBlocksData;
        })
    }, [setBlocksData, uploadedImage]);

    return (
        <div ref={textHtmlRef} className="w-full">
            <input type={"file"} accept="image/gif, image/jpeg, image/png, image/webp"
                   multiple={false}
                   onChange={(e) => {
                       if (e.target.files) setUploadedImage(e.target.files[0]);
                       else setUploadedImage(null);
                   }}/>
            <input placeholder="alt"/>
            {uploadedImage !== null ?
                // This is a local file so no point in optimization
                // eslint-disable-next-line @next/next/no-img-element
                <img className={"w-full"} alt={"image to insert"} src={URL.createObjectURL(uploadedImage)}/> :
                null
            }
        </div>
    );
};
