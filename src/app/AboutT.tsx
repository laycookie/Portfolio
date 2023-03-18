"use client";
import { motion } from "framer-motion";

type Props = {
  innerClassName?: string;
  outerClassName?: string;
  text: string;
};

export default function AboutT({
  innerClassName,
  outerClassName,
  text,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ amount: 1 }}
      className={outerClassName}
    >
      <h3 className={innerClassName}>{text}</h3>
    </motion.div>
  );
}
