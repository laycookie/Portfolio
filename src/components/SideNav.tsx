"use client";
import React, { useEffect, useState, Children } from "react";
import "./SideNav.css";

type Props = { children: React.ReactNode };

type SectionPrepNav = { name: string; position: number };

// Looks inside the first chilled and searches for sections which it than lists in the side nav with the name if there id.
// IMPORTANT: You are expected to have one child inside of it that stores all the sections
/* EX:
<SideNav>
  <main>
    <section id="FirstNavElement"></section>
    <section id="SecondNavElement"></section>
  </main>
<SideNav>
*/

export default function SideNav({ children }: Props) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [sections, setSections] = useState<SectionPrepNav[]>(
    [] as SectionPrepNav[]
  );
  useEffect(() => {
    const recalculatePositionsOfSections = () => {
      // Changes position cord of sections
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
    recalculatePositionsOfSections();
    window.addEventListener("resize", recalculatePositionsOfSections);
    return () => {
      window.removeEventListener("resize", recalculatePositionsOfSections);
    };
  }, [children]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <aside>
      <div
        className={`fixed
        flex flex-col h-[100dvh] justify-center 
        md:visible invisible`}
        style={
          isPageLoaded
            ? { opacity: 1, right: "1.5rem" }
            : { opacity: 0, right: "0" }
        }
      >
        <ul
          className={`relative before:content-[""] before:absolute before:-left-6
           before:h-full before:w-[0.125rem]
            before:bg-dark-main dark:before:bg-main before:rounded-xl
            md:transition-all md:duration-500 md:ease-in-out`}
        >
          {sections.map((section) => (
            <li key={crypto.randomUUID()} className="mt-2">
              <button
                onClick={() => {
                  scrollTo(0, section.position);
                }}
                className="side-btn text-sm sm:text-lg w-full "
              >
                <p className="w-full text-right">{section.name}</p>
                <div>
                  <div className="h-1 w-full bg-black dark:bg-white rounded-xl" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {children}
    </aside>
  );
}
