import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  const location = useLocation();
  const [dropDown, setDropDown] = React.useState<boolean>(false);
  const dropDownRef = React.useRef<HTMLUListElement>(null);
  const [pageTitle, setPageTitle] = React.useState<string>("");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Home");
        break;
      case "/blog":
        setPageTitle("Blog");
        break;
      case "/portfolio":
        setPageTitle("Portfolio");
        break;
      case "/contact":
        setPageTitle("Contact");
        break;
      default:
        setPageTitle("Error");
    }
  }, [location.pathname]);

  return (
    <nav
      className="
    text-xl font-semibold transition-all"
    >
      <ul
        className="flex justify-between
        py-6 bg-black 
        px-16 relative z-30"
      >
        <li>
          {/* Those elements might be not probably align please check */}
          <Link to="/" className="nav-btn md:inline hidden">
            Home
          </Link>
          <Link to={location.pathname} className="nav-btn md:hidden">
            {pageTitle}
          </Link>
        </li>
        <li>
          <ul className="flex space-x-4">
            <li className="nav-btn nav-hide">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="nav-btn nav-hide">
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li className="nav-btn nav-hide">
              <Link to="/contact">Contact</Link>
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
        className={`bg-black
        grid justify-center
        md:hidden
        space-y-6 pb-8
        transition-all ease-in-out duration-200 ${
          dropDown ? "delay-200" : "delay-0"
        }
        relative -mt-[${
          dropDown ? `${dropDownRef?.current?.clientHeight}px` : "0"
        }] z-0`}
      >
        <li>
          <Link
            to="/"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/blog"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/portfolio"
            className={`nav-btn-minimized ${
              dropDown ? "opacity-0" : "opacity-100 delay-200"
            }`}
          >
            Portfolio
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
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
