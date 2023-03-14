import Link from "next/link";
import React from "react";
import styles from "./EduCard.module.css";

type Props = {
  title: string;
  description: string;
  certID?: string;
  link?: string;
};

export default function EduCard({ title, description, certID, link }: Props) {
  if (link === undefined) {
    return (
      <div className={styles.neumorphic_card}>
        <h4 className="mb-4 text-3xl font-semibold">{title}</h4>
        <h5 className="mb-2 text-xl">{description}</h5>
        <p className="text-sm">{certID}</p>
      </div>
    );
  } else {
    return (
      <Link href={link}>
        <div className={styles.neumorphic_card}>
          <h4 className="mb-4 text-3xl font-semibold">{title}</h4>
          <h5 className="mb-2 text-xl">{description}</h5>
          <p className="text-sm">{certID}</p>
        </div>
      </Link>
    );
  }
}
