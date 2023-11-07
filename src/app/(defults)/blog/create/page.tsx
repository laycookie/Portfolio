"use client";
import React, {useEffect, useState} from "react";
import Turnstile from "react-turnstile";
import type {ElementsData, Content} from "@/types/blog";
import "@/styles/blogStyles.module.css";
import EditBlock from "@/app/(defults)/blog/create/EditBlock";
import ContextMenu from "@/app/(defults)/blog/create/ContextMenu";
import {CreatedContentCtx} from "@/app/(defults)/blog/create/createdContentCtx";
import {publishBlog} from "./blogSubmit";
import * as process from "process";


type Props = {};

export default function Page({}: Props) {
    const [blocksData, setBlocksData]
        = useState<ElementsData[]>([]);
    const [contextMenuPosition, setContextMenuPosition]
        = useState({x: 0, y: 0});
    const [selectedBlockIndex, setSelectedBlockIndex]
        = useState<number | null>(null);

    const cfSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY;
    useEffect(() => {
        if (cfSiteKey === undefined) throw new Error("Cloudflare site key is not defined");
    }, [cfSiteKey]);

    function generateRandomKey() {
        return Math.random().toString(36).slice(2, 11);
    }

    return (
        <CreatedContentCtx.Provider
            value={{
                blocksData,
                setBlocksData,
                selectedBlockIndex,
                setSelectedBlockIndex,
                contextMenuPosition,
                setContextMenuPosition,
            }}
        >
            <main className="defaults contain pt-[10vh]">
                <form onSubmit={(e: any) => {
                    e.preventDefault();
                    const blogContentData = new FormData(e.target);
                    blogContentData.delete("email");
                    blogContentData.delete("password");
                    if (!e.target?.email.value || !e.target?.password.value) return
                    const content: Content[] = blocksData
                        .map(block => block.content)
                        .filter(content => content !== null) as Content[];
                    publishBlog({
                        email: e.target.email.value,
                        password: e.target.password.value
                    }, content, blogContentData)
                }}
                      className="space-x-2">
                    <textarea name="title" placeholder="Title" className="w-full title"/>
                    <textarea name="description" placeholder="Description" className="w-full"/>
                    <ContextMenu/>
                    <div className="w-full space-y-2">
                        {blocksData.map((data, index) => {
                            return <EditBlock key={data.key}
                                              keyVal={data.key}
                                              index={index}
                            >
                                {(() => {
                                    switch (data.type) {
                                        case "text":
                                            return (
                                                <EditBlock.Text/>
                                            )
                                        case "image":
                                            return (
                                                <EditBlock.Image/>
                                            )
                                        default:
                                            return <p>This block is not implemented</p>
                                    }
                                })()}
                            </EditBlock>
                        })}
                    </div>


                    <button
                        className="block"
                        onClick={(e) => {
                            e.preventDefault();
                            setBlocksData(prev =>
                                [
                                    ...prev,
                                    {
                                        type: "text", // this is a default type
                                        key: generateRandomKey(),
                                        content: null
                                    }
                                ]
                            )
                        }}
                    >+
                    </button>
                    <input placeholder="email" id={"email"} name={"email"} type="email"/>
                    <input placeholder="password" id={"password"} name={"password"} type="password"/>
                    {cfSiteKey ? <Turnstile
                        sitekey={cfSiteKey}
                    /> : null}
                    <button>Publish</button>
                </form>
            </main>
        </CreatedContentCtx.Provider>
    );
}
