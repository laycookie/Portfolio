export type ElementsData = {
    type: BlogBlockTypes;
    key: string;
    content: Content;
};

export type Content = string | ImageFile | null
export type ImageFile = { file: File | null, name: string | null }

export type BlogBlockTypes = "text" | "image" | "video" | "audio" | "code";