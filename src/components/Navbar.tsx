"use client";

import Link from "next/link";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { on } from "events";

type Props = { pageTitle: string; hideUntil?: number };

export default function Navbar({ pageTitle, hideUntil = 250 }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const [isNavMobile, setIsNavMobile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [navOpacity, setNavOpacity] = useState<number>(0);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > hideUntil) {
        const navHight = navRef.current?.offsetHeight || 0;
        navRef.current?.style.setProperty("top", `-${navHight}px`);
        setIsDropdownOpen(false);
      } else {
        navRef.current?.style.setProperty("top", "0");
      }
    }
    onScroll();
    addEventListener("scroll", onScroll);

    return () => {
      removeEventListener("scroll", onScroll);
    };
  }, [hideUntil]);

  useEffect(() => {
    if (isDropdownOpen) {
      dropDownRef.current?.style.setProperty("top", "0");
    } else {
      const dropDownHight = dropDownRef.current?.offsetHeight || 0;
      dropDownRef.current?.style.setProperty("top", `-${dropDownHight}px`);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsNavMobile(false);
        setIsDropdownOpen(false);
      } else {
        setIsNavMobile(true);
      }
    }
    handleResize();
    addEventListener("resize", handleResize);
    setNavOpacity(1);
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed z-20 w-full"
      style={{ opacity: navOpacity }}
    >
      <ul
        className="relative z-10 bg-tertiary dark:bg-dark-tertiary
      flex justify-between px-24 py-2"
      >
        <li>
          {isNavMobile ? (
            <p className="nav-text">{pageTitle}</p>
          ) : (
            <Link href="/" className="nav-text nav-btn">
              <p>Home</p>
            </Link>
          )}
        </li>
        <li>
          {isNavMobile ? (
            <>
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                X
              </button>
            </>
          ) : (
            <ul className="flex space-x-6">
              <li>
                <Link href="/blog" className="nav-text nav-btn">
                  <p>Blog</p>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="nav-text nav-btn">
                  <p>Portfolio</p>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="nav-text nav-btn">
                  <p>Contact</p>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <ul
        ref={dropDownRef}
        className="relative z-0 bg-tertiary dark:bg-dark-tertiary
        flex flex-col items-center w-full space-y-2 pb-4 transition-all"
      >
        <li>
          <Link href="/" className="nav-text nav-btn">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/blog" className="nav-text nav-btn">
            <p>Blog</p>
          </Link>
        </li>
        <li>
          <Link href="/portfolio" className="nav-text nav-btn">
            <p>Portfolio</p>
          </Link>
        </li>
        <li>
          <Link href="/contact" className="nav-text nav-btn">
            <p>Contact</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
