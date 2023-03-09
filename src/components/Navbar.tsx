"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import "./Navbar.css";

type Props = { pageTitle: string; hideUntil?: number };

export default function Navbar({ pageTitle, hideUntil = 35 }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const [isNavHidden, setIsNavHidden] = useState<boolean>(false);
  const [isDropDownVis, setIsDropDownVis] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > hideUntil) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
    });
  }, []);

  const [dropOffSet, setDropOffSet] = useState(0);
  useEffect(() => {
    setDropOffSet(
      dropDownRef?.current?.clientHeight
        ? dropDownRef?.current?.clientHeight
        : 0
    );
  }, [dropDownRef?.current?.clientHeight]);

  return (
    <nav
      ref={navRef}
      className={`
    text-xl font-semibold transition-all w-full fixed 
    backdrop-blur-sm`}
      style={{
        top: `${isNavHidden ? "-" + navRef?.current?.clientHeight : 0}px`,
      }}
    >
      <ul
        className=" bg-tertiary/50 dark:bg-dark-tertiary/50
        relative flex justify-between py-4 z-30 
        holder"
      >
        <li>
          {/* Those elements might be not probably align please check */}
          <Link href="/" className="nav-btn md:inline hidden">
            Home
          </Link>
          <h1 className="nav-btn md:hidden">{pageTitle}</h1>
        </li>
        <li>
          <ul className="flex space-x-4">
            <li className="nav-btn nav-hide">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="nav-btn nav-hide">
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li className="nav-btn nav-hide">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="">
              <button
                className="md:hidden"
                onClick={() => {
                  setIsDropDownVis(!isDropDownVis);
                }}
              >
                X
              </button>
            </li>
          </ul>
        </li>
      </ul>

      <ul
        ref={dropDownRef}
        className={`bg-tertiary/50 dark:bg-dark-tertiary/50
        grid justify-center
        md:hidden
        space-y-6 pb-8
        transition-all ease-in-out duration-200 ${
          isDropDownVis ? "delay-0" : "delay-200"
        }
        relative z-0`}
        style={{
          marginTop: isDropDownVis ? `0px` : `-${dropOffSet}px`,
        }}
      >
        <li>
          <Link
            href="/"
            className={`nav-btn-minimized ${
              isDropDownVis ? "opacity-100 delay-200" : "opacity-0"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`nav-btn-minimized ${
              isDropDownVis ? "opacity-100 delay-200" : "opacity-0"
            }`}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            className={`nav-btn-minimized ${
              isDropDownVis ? "opacity-100 delay-200" : "opacity-0"
            }`}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`nav-btn-minimized ${
              isDropDownVis ? "opacity-100 delay-200" : "opacity-0"
            }`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
