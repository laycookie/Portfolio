import React from "react";

type Props = {
  text: string;
};

export default function footer({ text }: Props) {
  return <div className="text-xs">{text}</div>;
}
