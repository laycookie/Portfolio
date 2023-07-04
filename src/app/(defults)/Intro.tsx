import TypeIn from "@/components/TypeIn";
import WriteInTxt from "@/components/WriteInTxt";

type Props = {
  firstAniLength: number;
  secondAniLength: number;
};

export default function Intro({ firstAniLength, secondAniLength }: Props) {
  return (
    <>
      <TypeIn
        text={["Hello, my name is ", "Dennis Lonoshchuk"]}
        aniLength={firstAniLength}
      />
      <WriteInTxt
        SVGUntil={firstAniLength}
        aniLength={secondAniLength}
        text="I’m a front-end web developer based in California."
        className={`h-10 w-full mt-4
    text-lg sm:text-2xl font-light
 stroke-1 stroke-black fill-black
  dark:stroke-white dark:fill-white
  opacity-0`}
      />
    </>
  );
}
