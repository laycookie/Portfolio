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

      <ul className={dropDown ? "grid justify-center md:hidden" : "hidden"}>
        <li className="nav-btn-minimized">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-btn-minimized">
          <Link to="/blog">Blog</Link>
        </li>
        <li className="nav-btn-minimized">
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li className="nav-btn-minimized">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
