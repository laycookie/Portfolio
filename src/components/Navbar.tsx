"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import "./Navbar.css";

type Props = { pageTitle: string; hideUntil?: number };

export default function Navbar({ pageTitle, hideUntil = 35 }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLUListElement>(null);

  const [isNavHidden, setIsNavHidden] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > hideUntil) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`
    text-xl font-semibold transition-all w-full fixed`}
      style={{
        top: `${isNavHidden ? "-" + navRef?.current?.clientHeight : 0}px`,
      }}
    >
      <ul
        className="flex justify-between py-6 holder bg-tertiary dark:bg-dark-tertiary
        relative z-30"
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
                  setDropDown(!dropDown);
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
        className={`bg-tertiary dark:bg-dark-tertiary
        grid justify-center
        md:hidden
        space-y-6 pb-8
        transition-all ease-in-out duration-200 ${
          dropDown ? "delay-200" : "delay-0"
        }
        relative z-0`}
        style={{
          marginTop: dropDown
            ? `-${dropDownRef?.current?.clientHeight}px`
            : "0px",
        }}
      >
        <li>
          <Link
            href="/"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            href="/portfolio"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
