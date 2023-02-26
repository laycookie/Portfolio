import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer>
      <ul className="flex justify-between">
        <li>Copyright</li>
        <li>
          <ul className="flex space-x-4">
            <li>git</li>
            <li>LinkedIn</li>
            <li>gmail</li>
            <li>discord</li>
          </ul>
        </li>
      </ul>
    </footer>
  );
}
