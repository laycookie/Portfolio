"use client";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function Animate({ children }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="m-auto"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
