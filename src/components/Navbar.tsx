"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";

type Props = { hideUntil?: number };

export default function Navbar({ hideUntil = 250 }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const [pageTitle, setPageTitle] = useState<string>("" as string);

  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [isNavMobile, setIsNavMobile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Hides navbar when scrolling down and shows it when scrolling up
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

  // Controls dropdown animation
  useEffect(() => {
    if (isDropdownOpen) {
      dropDownRef.current?.style.setProperty("top", "0");
    } else {
      const dropDownHight = dropDownRef.current?.offsetHeight || 0;
      dropDownRef.current?.style.setProperty("top", `-${dropDownHight}px`);
    }
  }, [isDropdownOpen]);

  // sets new title every time the page is changed
  const pathname = usePathname();
  useEffect(() => {
    setPageTitle(document.title);
  }, [pathname]);

  useEffect(() => {
    setIsPageLoaded(true);

    // Controls how nav bar looks when switching between mobile and desktop
    function navbarAdaptivityController() {
      if (window.innerWidth > 768) {
        setIsNavMobile(false);
        setIsDropdownOpen(false);
      } else {
        setIsNavMobile(true);
      }
    }
    navbarAdaptivityController();
    addEventListener("resize", navbarAdaptivityController);
    return () => {
      removeEventListener("resize", navbarAdaptivityController);
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed z-20 w-full">
      <ul
        className="relative z-10 bg-tertiary dark:bg-dark-tertiary
      flex justify-between px-24 py-2 transition-all duration-500"
        style={isPageLoaded ? { opacity: "1" } : { opacity: "0" }}
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
        style={
          isPageLoaded && isDropdownOpen
            ? { visibility: "visible" }
            : { visibility: "collapse" }
        }
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
