import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav>
      <ul className="flex justify-between">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <ul className="flex space-x-4">
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
