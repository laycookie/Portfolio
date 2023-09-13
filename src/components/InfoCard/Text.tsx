type Props = { text: string };

export default function text({ text }: Props) {
  return <p className="text-lg mb-0.5">{text}</p>;
}
