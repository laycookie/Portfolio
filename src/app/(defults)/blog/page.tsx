import InfoCard from "@/components/InfoCard/InfoCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

type Props = {};

export default function page({}: Props) {
  return (
    <main className="defaults contain">
      <h1 className="mt-32 flex justify-center w-full">Blogs</h1>
      <div className="mt-8">
        <InfoCard link="test">
          <InfoCard.Title title="Test" />
          <InfoCard.Text text="Lorem Ipsum" />
          <InfoCard.Footer text="Certification" />
        </InfoCard>
      </div>
    </main>
  );
}
