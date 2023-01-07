import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  const [homeButton, setHomeButton] = React.useState("test");
  return (
    <nav
      className="py-6 bg-black 
    text-xl font-semibold"
    >
      <ul
        className="flex justify-between 
      px-16"
      >
        <li>
          <Link to="/" className="nav-btn md:inline hidden">
            Home
          </Link>
          <Link to="/" className="nav-btn md:hidden">
            {homeButton}
          </Link>
        </li>
        <li>
          <ul className="flex space-x-4">
            <li>
              <Link to="/blog" className="nav-btn nav-hide">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="nav-btn nav-hide">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-btn nav-hide">
                Contact
              </Link>
            </li>
            <li>
              <button className="md:hidden">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 19L2 19"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19 9.93332L2 9.93332"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19 2L2 2"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
