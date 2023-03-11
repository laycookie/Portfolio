"use client";
import React, { useEffect, useRef } from "react";

type Props = {};

export default function SkillGrid({}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gridRef.current === null) return;
    window.addEventListener("mousemove", (e) => {
      if (gridRef.current === null) return;
      const rect = gridRef.current.getBoundingClientRect();
      const posRelativeToE = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      gridRef.current.style.setProperty("--mouse-x", posRelativeToE.x + "px");
      gridRef.current.style.setProperty("--mouse-y", posRelativeToE.y + "px");
    });
  }, []);

  return (
    <>
      <div
        className="grid-hover-effect p-[2px] transition-opacity duration-300 ease-in-out"
        ref={gridRef}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 gap-[2px]
           "
        >
          <h2 className="bg-dark-main flex justify-center items-center">
            Familiar technologies
          </h2>
          <h2 className="bg-dark-main hidden lg:flex justify-center items-center">
            Fun demos
          </h2>

          <div className="flex  bg-dark-main">
            <h3 className="w-32 my-auto pl-4">Lang.</h3>
            <div className="pl-32 my-auto">
              <p>Python</p>
              <p>Node </p>
              <p>C</p>
              <p>C# </p>
              <p>JavaScript</p>
              <p>Typescript</p>
            </div>
          </div>
          <div className="row-span-3 py-4 bg-dark-main hidden lg:block"></div>
          <div className="bg-dark-main">
            <div className="flex py-4">
              <h3 className="w-32 my-auto justify-center pl-4">Front-end</h3>
              <div className="pl-32 my-auto">
                <p>React</p>
                <p>Three.js</p>
                <p>TailwindCSS</p>
              </div>
            </div>
            <div className="flex py-4">
              <h3 className="w-32 my-auto pl-4">Back-end</h3>
              <div className="pl-32 my-auto">
                <p>Express</p>
                <p>Flask</p>
              </div>
            </div>
          </div>
          <div className="flex py-4 bg-dark-main">
            <h3 className="w-32 my-auto pl-4">Misc</h3>
            <div className="pl-32 my-auto">
              <p>Prisma</p>
              <p>SQL</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
