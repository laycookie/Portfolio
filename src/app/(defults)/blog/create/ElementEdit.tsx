"use client";
import { useRef } from "react";
import { DraggableCore } from "react-draggable";
import "@/styles/blogStyles.css";

type Props = {};

export default function ElementEdit({}: Props) {
  const element = useRef<HTMLDivElement>(null);

  function getTranslateY(event: MouseEvent) {
    if (!element.current) return;
    element.current.style.opacity = "0.5";
    // Get current transformY value
    let currentTransformY = Number(
      element.current.style.transform.match(/-?\d+/)?.[0] as string
    );
    currentTransformY += event.movementY;
    element.current.style.transform = `translateY(${currentTransformY}px)`;
  }

  return (
    <DraggableCore
      onStart={() => {
        if (!element.current) return;
        // Just makes sure translate is applied
        element.current.style.transform = "translateY(0)";

        window.addEventListener("mousemove", getTranslateY);
      }}
      onStop={() => {
        if (!element.current) return;
        element.current.style.opacity = "1";
        element.current.style.transform = "translateY(0)";

        window.removeEventListener("mousemove", getTranslateY);
      }}
    >
      <div className="flex draggable" ref={element}>
        <button>=</button>
        <textarea className="w-full"></textarea>
      </div>
    </DraggableCore>
    // <Draggable
    //   axis="y"
    //   onStart={() => {
    //     if (!e.current) return;
    //     e.current.style.opacity = "0.5";
    //   }}
    //   onStop={() => {
    //     if (!e.current) return;
    //     e.current.style.opacity = "1";
    //     e.current.style.transform = "translateY(0)";
    //   }}
    // >
    //   <div className="flex draggable" ref={e}>
    //     <button>=</button>
    //     <textarea className="w-full"></textarea>
    //   </div>
    // </Draggable>
  );
}
