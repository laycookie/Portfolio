import { Metadata } from "next";
import Bg from "./Bg";

type Props = {};

export const metadata: Metadata = {
  title: "Contact",
};

export default function page({}: Props) {
  return (
    <>
      <Bg />
      <div
        className="relative flex flex-col justify-center
    h-[100vh] mx-16
    z-10"
      >
        <div
          className="px-8 py-4 bg-secondary/50 dark:bg-dark-secondary/50 backdrop-blur-sm
      rounded-xl"
        >
          <h1 className="flex justify-center w-full my-8">Contact form</h1>
          <form>
            <div className="flex mb-4 space-x-4">
              <input type="text" placeholder="Name" className="w-full" />
              <input type="text" placeholder="Last name" className="w-full" />
            </div>
            <div className="flex flex-col h-full">
              <input type="text" placeholder="Subject" className="mb-4" />
              <textarea
                name=""
                id=""
                className="h-[30vh]"
                placeholder="Content"
                aria-required="false"
              />
              <input type="submit" value="send" className="my-4" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
