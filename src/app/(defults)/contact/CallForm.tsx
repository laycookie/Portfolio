"use client";

type Props = {};

export default function CallForm({}: Props) {
  return (
    <button
      onClick={() => {
        window.open("/contact/form", "popup", "width=500,height=800");
      }}
      className="font-semibold
          dark:text-gray-300 dark:hover:text-white
          text-gray-700 hover:text-black
          transition-all ease-in-out duration-200"
    >
      form
    </button>
  );
}
