import {useEffect, useState} from 'react';
import {BlogBlockTypes} from "@/types/blog";

type props = {}
export default function TextBlock({}: props) {
    const [charSelected, setCharSelected]
        = useState<null | { char: bigint, line: bigint }>(null);

    return (
        <div className="w-full" contentEditable>Hello</div>
    );
};

