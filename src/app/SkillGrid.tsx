"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./SkillGrid.module.css";

type Props = {};

export default function SkillGrid({}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current === null) return;
    // setting default values so that the bg color would load
    gridRef.current.style.setProperty("--mouse-x", -1000 + "px");
    gridRef.current.style.setProperty("--mouse-y", -1000 + "px");
    window.addEventListener("mousemove", (e) => {
      if (gridRef.current === null) return;
      const rect = gridRef.current.getBoundingClientRect();
      const posRelativeToE = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // passing current mouse position to css variables
      gridRef.current.style.setProperty("--mouse-x", posRelativeToE.x + "px");
      gridRef.current.style.setProperty("--mouse-y", posRelativeToE.y + "px");
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`grid_hover_effect dark:grid_hover_effect p-[2px] w-[100%] m-auto`}
      ref={gridRef}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 gap-[2px]">
        <h2
          className={
            styles.grid_col_Title_prep +
            " bg-main dark:bg-dark-main flex text-center text-3xl sm:text-4xl px-2"
          }
        >
          Familiar technologies
        </h2>
        <h2
          className={
            styles.grid_col_Title_prep +
            " bg-main dark:bg-dark-main hidden lg:flex text-4xl "
          }
        >
          Fun demos
        </h2>

        <div className={`${styles.outer_grid_e} bg-main dark:bg-dark-main`}>
          <div className="sm:flex sm:py-4">
            <h3 className={styles.bold_text}>Lang.</h3>
            <div className={styles.inner_grid_text}>
              <p>Python</p>
              <p>Node </p>
              <p>C</p>
              <p>C# </p>
              <p>JavaScript</p>
              <p>Typescript</p>
            </div>
          </div>
        </div>
        <div
          className="row-span-3 py-4 hidden lg:block
          bg-main dark:bg-dark-main"
        ></div>
        <div
          className={`${styles.outer_grid_e} bg-main dark:bg-dark-main outer_grid_e py-4`}
        >
          <div className="sm:flex pb-2">
            <h3 className={styles.bold_text}>Front-end</h3>
            <div className={styles.inner_grid_text}>
              <p>React</p>
              <p>Three.js</p>
              <p>TailwindCSS</p>
            </div>
          </div>

          <div className="sm:flex">
            <h3 className={styles.bold_text}>Back-end</h3>
            <div className={styles.inner_grid_text}>
              <p>Express</p>
              <p>Flask</p>
            </div>
          </div>
        </div>
        <div className={`${styles.outer_grid_e} bg-main dark:bg-dark-main`}>
          <div className="sm:flex py-auto sm:py-4 ">
            <h3 className={styles.bold_text}>Misc</h3>
            <div className={styles.inner_grid_text}>
              <p>Prisma</p>
              <p>SQL</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
