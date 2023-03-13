"use client";
import React, { useEffect } from "react";
import "./SideNav.css";

type Props = { children: React.ReactNode };

type SectionPrepNav = { name: string; position: number };

export default function SideNav({ children }: Props) {
  const [sections, setSections] = React.useState<SectionPrepNav[]>(
    [] as SectionPrepNav[]
  );
  useEffect(() => {
    const sectionsCli: SectionPrepNav[] = [] as SectionPrepNav[];
    if (!children) return;
    for (const child of children.props.children) {
      if (child.type === "section") {
        /* Takes position of the section using getBoundingClientRect,
         * and adds vertical window scroll to negate the effect of user scrolling.
         */
        const sectionPosition =
          (document.getElementById(child.props.id)?.getBoundingClientRect()
            .y as number) + window.scrollY;

        sectionsCli.push({
          name: child.props.id,
          position: sectionPosition,
        } as SectionPrepNav);
      }
    }
    setSections(sectionsCli);
  }, []);

  return (
    <>
      <ul
        className="fixed right-6
      flex flex-col h-[100vh] justify-center"
      >
        {sections.map((section, index) => (
          <li key={index} className="mt-2">
            <button
              onClick={() => {
                scrollTo(0, section.position);
              }}
              className="side-btn text-sm sm:text-lg"
            >
              {section.name}
              <div>
                {" "}
                <div className="h-1 w-full bg-black dark:bg-white rounded-xl" />
              </div>
            </button>
          </li>
        ))}
      </ul>
      {children}
    </>
  );
}
