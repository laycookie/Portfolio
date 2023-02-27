import React from "react";
import "./WriteInTxt.css";

type Props = {
  text: string;
  className: string;
};

export default function WriteInTxt({ text, className }: Props) {
  return (
    <svg className={className + " text-line"}>
      <text y="50%">{text}</text>
    </svg>
  );
}
