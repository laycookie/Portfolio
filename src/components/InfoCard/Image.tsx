import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

// Work in progress
export default function image({ src, alt }: Props) {
  return <Image src={src} alt={alt} />;
}
