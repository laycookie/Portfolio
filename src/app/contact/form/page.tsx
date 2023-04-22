import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <h1>Contact form</h1>

      <form action="" className="mx-8 p-2 drop-shadow-lg">
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
          <input type="submit" value="send" />
        </div>
      </form>
    </>
  );
}
