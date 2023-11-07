export type ElementsData = {
    type: BlogBlockTypes;
    key: string;
    content: Content;
};

export type Content = string | ImageFile | null
export type ImageFile = { file: File | null, name: string | null }

export type BlogBlockTypes = "title" | "description" | "text" | "image" | "video" | "audio" | "code";

export type blogContent = {
    blogid: number,
    title: string,
    description: string,
    blogcontents: string,
    readtimemin: number,
    link: string
}

export type blogContentData = {
    name: BlogBlockTypes,
    value: string
}