export type ElementsData = {
    type: BlogBlockTypes;
    key: string;
};

export type BlogBlockTypes = "text" | "image" | "video" | "audio" | "code";