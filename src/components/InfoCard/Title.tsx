import React from "react";

type Props = {
  title: string;
};

export default function title({ title }: Props) {
  return <h3 className="text-3xl font-semibold mb-1">{title}</h3>;
}
