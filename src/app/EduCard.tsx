"use client";
import Link from "next/link";
import { motion } from "framer-motion";
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
      <>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ amount: 1 }}
          className={`neumorphic_card_shadow
        transition-all neumorphic_card`}
        >
          {elHtml}
        </motion.div>
      </>
    );
  } else {
    return (
      <>
        <Link href={link}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ amount: 1 }}
            className={`neumorphic_card_shadow
          transition-all neumorphic_card 
          hover:neumorphic_card_pressed`}
          >
            {elHtml}
          </motion.div>
        </Link>
      </>
    );
  }
}
