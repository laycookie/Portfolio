import {useEffect, useState} from 'react';
import {BlogBlockTypes} from "@/types/blog";

type props = {}
export default function TextBlock({}: props) {
    const [charSelected, setCharSelected]
        = useState<null | { char: bigint, line: bigint }>(null);

    return (
        <span className="w-full" contentEditable
              onInput={() => {
            console.log("test")
        }}/>
    );
};

