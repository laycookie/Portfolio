"use client";
import { motion } from "framer-motion";

type Props = {
  innerClassName?: string;
  outerClassName?: string;
  text: string;
  offSet: number;
};

export default function AboutT({
  text,
  innerClassName,
  outerClassName,
  offSet,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: offSet }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className={outerClassName}
    >
      <h3 className={innerClassName}>{text}</h3>
    </motion.div>
  );
}
