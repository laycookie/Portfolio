"use client";
import React, {useRef, useEffect} from "react";
import {DraggableCore} from "react-draggable";
import "@/styles/blogStyles.css";

type Props = {

};

export default function EditElement({}: Props) {
    const thisElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!thisElement.current) return;
        thisElement.current.style.transform = "translateY(0)";
    }, [thisElement]);

    function removeStylesInChildren(element: HTMLElement, ignoreElements: HTMLElement[] = []) {
        for (let i = 0; element.children.length > i; i++) {
            const child = element.children[i];
            if (ignoreElements.includes(child as HTMLElement)) continue;
            child.removeAttribute("style");
        }
    }

    function applyStyles(element: HTMLElement) {
        element.style.opacity = "0.5";
    }

    function getTranslateY(event: MouseEvent) {
        if (!thisElement.current) return;
        // Get current transformY value
        let currentTransformY = Number(
            thisElement.current.style.transform.match(/-?\d+/)?.[0] as string
        ) || 0;
        currentTransformY += event.movementY;
        thisElement.current.style.transform = `translateY(${currentTransformY}px)`;
    }

    function applyStylesOnDrag(event: MouseEvent) {
        if (!thisElement.current) return;
        let elementsFromPoint= (document.elementsFromPoint(event.clientX, event.clientY) as HTMLElement[]);
        elementsFromPoint = elementsFromPoint.filter((element) =>
            element.classList.contains("draggable") && element !== thisElement.current);
        let cursorOverElement;
        for (cursorOverElement of elementsFromPoint) {
            applyStyles(cursorOverElement)
        }
        const parentOfDraggables = thisElement.current.parentElement;
        if (!parentOfDraggables) return;
        removeStylesInChildren(parentOfDraggables, [...elementsFromPoint, thisElement.current]);
    }

    const handleDraggablesOnMouseMove = (event: MouseEvent) => {
        getTranslateY(event);
        applyStylesOnDrag(event);
    };

    return (
        <DraggableCore
            onStart={() => {
                if (!thisElement.current) return;
                thisElement.current.style.opacity = "0.5";

                window.addEventListener("mousemove", handleDraggablesOnMouseMove);
            }}
            onStop={() => {
                if (!thisElement.current) return;
                window.removeEventListener("mousemove", handleDraggablesOnMouseMove);

                if (!thisElement.current.parentElement) return;
                removeStylesInChildren(thisElement.current.parentElement);
            }}
        >
            <div className="flex draggable" ref={thisElement}>
                <button>=</button>
                <textarea className="w-full"></textarea>
            </div>
        </DraggableCore>
    );
}
