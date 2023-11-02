"use client"

import {useEffect, useState} from "react";

type Props = {
    rawImage: Uint8Array;
    imageType: string;
}

export default function DisplayImage({rawImage, imageType}: Props) {
    const [imageUrl, setImageUrl]
        = useState<null | string>(null);
    useEffect(() => {
        // next converts Uint8Array to array, so we need to convert it back.
        const rawImageBuffer = new Uint8Array(rawImage);
        const imageBlob = new Blob([rawImageBuffer.buffer], {type: imageType});
        setImageUrl(URL.createObjectURL(imageBlob));
    }, [imageType, rawImage]);

    return imageUrl ? <img alt={"test"} src={imageUrl}/> : <>Loading...</>;
}