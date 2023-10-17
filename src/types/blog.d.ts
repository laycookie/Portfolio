export type ElementsData = {
    type: BlogBlockTypes;
    key: string;
    content: string | File | null;
};

export type BlogBlockTypes = "text" | "image" | "video" | "audio" | "code";