"use client";
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

  const addMotionDiv = (child: JSX.Element) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ amount: 1, once: true }}
      >
        {child}
      </motion.div>
    );
  };

  if (link === undefined) {
    return addMotionDiv(
      <div
        className={`neumorphic_card_shadow
    transition-all neumorphic_card`}
      >
        {elHtml}
      </div>
    );
  } else {
    return (
      <>
        <a href={link} target="_blank" rel="noreferrer">
          {addMotionDiv(
            <div
              className={`neumorphic_card_shadow
            transition-all neumorphic_card 
            hover:neumorphic_card_pressed`}
            >
              {elHtml}
            </div>
          )}
        </a>
      </>
    );
  }
}
