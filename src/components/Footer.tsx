"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";

type Props = {};

export default function Footer({}: Props) {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <footer
      className="bg-tertiary dark:bg-dark-tertiary
    sticky top-[100vh]
    holder py-8"
    >
      <ul
        className="flex justify-between items-center
       mx-auto "
      >
        <li>
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              localStorage.setItem(
                "theme",
                `${theme === "dark" ? "light" : "dark"}`
              );
            }}
          >
            Theme mode
          </button>
        </li>
        <li>
          <ul className="flex items-center space-x-4">
            <li>
              <a
                href="https://github.com/laycookie"
                target={"_blank"}
                rel="noreferrer"
              >
                <Image
                  src={"/social-Icons/GitHub-icon.svg"}
                  alt="GitHub"
                  width={50}
                  height={50}
                />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/dennis-lonoshchuk-104842231/"
                target={"_blank"}
                rel="noreferrer"
              >
                <Image
                  src={"/social-Icons/Linkedin-icon.svg"}
                  alt="LinkedIn"
                  width={50}
                  height={50}
                />
              </a>
            </li>
            <li>
              {" "}
              <Image
                src={"/social-Icons/Gmail-icon.svg"}
                alt="Gmail"
                width={50}
                height={50}
              />
            </li>
            <li>
              {" "}
              <Image
                src={"/social-Icons/Discord-icon.svg"}
                alt="Discord"
                width={50}
                height={50}
              />
            </li>
          </ul>
        </li>
      </ul>
    </footer>
  );
}
