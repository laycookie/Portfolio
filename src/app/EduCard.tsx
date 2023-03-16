import Link from "next/link";
import React from "react";
import "./EduCard.css";

type Props = {
  title: string;
  description: string;
  certID?: string;
  link?: string;
};

export default function EduCard({ title, description, certID, link }: Props) {
  const elHtml = (
    <>
      <h4 className="mb-4 text-3xl font-semibold">{title}</h4>
      <h5 className="mb-2 text-xl">{description}</h5>
      {certID ? <p className="text-sm">{certID}</p> : null}
    </>
  );

  if (link === undefined) {
    return (
      <div
        className={`neumorphic_card_shadow
        transition-all neumorphic_card dark:neumorphic_card`}
      >
        {elHtml}
      </div>
    );
  } else {
    return (
      <Link href={link}>
        <div
          className={`neumorphic_card_shadow
          transition-all neumorphic_card dark:neumorphic_card
          hover:neumorphic_card_pressed hover:dark:neumorphic_card_pressed`}
        >
          {elHtml}
        </div>
      </Link>
    );
  }
}
