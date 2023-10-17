import React, {useState} from 'react';

export default function ImageBlock() {
    const [uploadedImage, setUploadedImage]
        = useState<null | File>(null);

    return (
        <>
            <input type={"file"} accept="image/gif, image/jpeg, image/png, image/webp"
                   multiple={false}
                   onChange={(e) => {
                       if (e.target.files) setUploadedImage(e.target.files[0]);
                       else setUploadedImage(null);

                   }}/>
            <input placeholder="alt"/>
            {uploadedImage !== null ?
                <img className={"w-full"} alt={"image to insert"} src={URL.createObjectURL(uploadedImage)}/> :
                null
            }
        </>
    );
};
