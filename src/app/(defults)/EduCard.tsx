"use client";
import { motion } from "framer-motion";
import InfoCard from "@/components/InfoCard/InfoCard";

type Props = {
  title: string;
  description: string;
  footer?: string;
  link?: string;
};

export default function EduCard({ title, description, footer, link }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ amount: 1, once: true }}
    >
      <InfoCard link={link ? link : null}>
        <InfoCard.Title title={title} />
        <InfoCard.Text text={description} />
        {footer ? <InfoCard.Footer text={footer} /> : null}
      </InfoCard>
    </motion.div>
  );
}
