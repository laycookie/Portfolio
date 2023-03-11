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
          <h2 className="bg-dark-main flex justify-center items-center text-2xl sm:text-3xl font-semibold">
            Familiar technologies
          </h2>
          <h2 className="bg-dark-main hidden lg:flex justify-center items-center text-3xl font-semibold">
            Fun demos
          </h2>

          <div className="bg-dark-main flex flex-col justify-center">
            <div className="sm:flex sm:py-4 bg-dark-main">
              <h3 className="sm:w-32 my-auto sm:pl-4 text-xl text-center sm:text-left font-semibold">
                Lang.
              </h3>
              <div className="pl-0 sm:pl-32 my-auto text-center sm:text-left">
                <p>Python</p>
                <p>Node </p>
                <p>C</p>
                <p>C# </p>
                <p>JavaScript</p>
                <p>Typescript</p>
              </div>
            </div>
          </div>
          <div className="row-span-3 py-4 bg-dark-main hidden lg:block"></div>
          <div className="bg-dark-main flex flex-col justify-center py-4">
            <div className="sm:flex pb-2">
              <h3 className="sm:w-32 my-auto sm:pl-4 text-xl text-center sm:text-left font-semibold">
                Front-end
              </h3>
              <div className="pl-0 sm:pl-32 my-auto text-center sm:text-left">
                <p>React</p>
                <p>Three.js</p>
                <p>TailwindCSS</p>
              </div>
            </div>

            <div className="sm:flex">
              <h3 className="sm:w-32 my-auto sm:pl-4 text-xl text-center sm:text-left font-semibold">
                Back-end
              </h3>
              <div className="pl-0 sm:pl-32 my-auto text-center sm:text-left">
                <p>Express</p>
                <p>Flask</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-main flex flex-col justify-center">
            <div className=" sm:flex py-auto sm:py-4 ">
              <h3 className="sm:w-32 my-auto sm:pl-4 text-xl text-center sm:text-left font-semibold">
                Misc
              </h3>
              <div className="pl-0 sm:pl-32 my-auto text-center sm:text-left">
                <p>Prisma</p>
                <p>SQL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
