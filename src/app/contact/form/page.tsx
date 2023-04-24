import Bg from "./Bg";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <Bg />
      <div
        className="flex flex-col justify-center
    h-[100vh] mx-8 relative
    z-10"
      >
        <div
          className="p-2 bg-secondary dark:bg-dark-secondary
      rounded-xl shadow-lg shadow-tertiary/70 dark:shadow-dark-tertiary/70"
        >
          <h1 className="flex justify-center w-full my-8">Contact form</h1>
          <form action="">
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
