import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  const location = useLocation();
  const [dropDown, setDropDown] = React.useState<boolean>(false);

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
            {document.title}
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
              <button className="md:hidden" onClick={() => {
                setDropDown(!dropDown)
                }}>
X
              </button>
            </li>
          </ul>
        </li>
      </ul>
      
      <ul className={dropDown ? "grid justify-center" : "hidden"}>
        <li>
              <Link to="/" className="nav-btn-minimized">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="nav-btn-minimized">
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
