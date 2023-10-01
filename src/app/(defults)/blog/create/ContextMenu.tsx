import {useState} from 'react';
import {BlogBlockTypes} from "@/types/blog";

type props = {

}

function ContextMenu({} : props) {
    const [type, setType]
        = useState<BlogBlockTypes | null>(null);




    return (
        <div className="fixed left-4" style={{visibility: type !== null ? "visible": "hidden"}}>
            <ul className="bg-black border-white border-2">
                {["text", "image", "video", "audio", "code"]
                    .map((item, index) =>
                        <li {...{id: item} as { id: BlogBlockTypes }}
                            key={index}>
                            <button className="pl-2 pr-2 py-1 hover:bg-dark-secondary w-24 text-left
                            flex justify-between"
                                    onClick={() => {
                                        if (!setType) return
                                        setType(item as BlogBlockTypes)
                                    }}>
                                <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                                <p style={{
                                    visibility: item === type ?
                                        "visible" :
                                        "hidden"
                                }}>C</p>
                            </button>

                        </li>
                    )}
            </ul>
        </div>
    );
}

export default ContextMenu;