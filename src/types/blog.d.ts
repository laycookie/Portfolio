export type ElementsData = {
    type: BlogBlockTypes;
    key: string;
    content?: string;
};

export type BlogBlockTypes = "text" | "image" | "video" | "audio" | "code";