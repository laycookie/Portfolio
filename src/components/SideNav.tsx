"use client";
import React, { useEffect, Children, isValidElement } from "react";
import "./SideNav.css";

type Props = { children: React.ReactNode };

type SectionPrepNav = { name: string; position: number };

// Looks inside the first chilled and searches for sections which it than lists in the side nav with the name if there id.
// WARNING: You are expected to have one child inside of it that stores all the sections
/* EX:
<SideNav>
  <main>
    <section id="FirstNavElement"></section>
    <section id="SecondNavElement"></section>
  </main>
<SideNav>
*/

export default function SideNav({ children }: Props) {
  const [sections, setSections] = React.useState<SectionPrepNav[]>(
    [] as SectionPrepNav[]
  );
  useEffect(() => {
    const handleResize = () => {
      const sectionsCli: SectionPrepNav[] = [] as SectionPrepNav[];
      if (!children) return;
      const childrenVer = Children.only(children);
      if (!React.isValidElement(childrenVer)) return;
      for (const child of childrenVer.props.children) {
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
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ul
        className="fixed right-6
      flex flex-col h-[100vh] justify-center "
      >
        {sections.map((section, index) => (
          <li key={index} className="mt-2">
            <button
              onClick={() => {
                scrollTo(0, section.position);
              }}
              className="side-btn text-sm sm:text-lg w-full "
            >
              <p className="w-full text-right">{section.name}</p>
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
