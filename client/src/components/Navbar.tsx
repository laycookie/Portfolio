import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  const location = useLocation();
  const [dropDown, setDropDown] = React.useState<boolean>(false);
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
        className={`bg-black
        grid justify-center
        md:hidden
        space-y-6 pb-8
        transition-all ease-in-out duration-300
        relative -translate-y-[${dropDown ? "0%" : "100%"}] z-0`}
      >
        <li>
          <Link to="/" className="nav-btn-minimized">
            Home
          </Link>
        </li>
        <li>
          <Link to="/blog" className="nav-btn-minimized transition">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/portfolio" className="nav-btn-minimized">
            Portfolio
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-btn-minimized">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
