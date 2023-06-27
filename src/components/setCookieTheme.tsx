"use server";
import { cookies } from "next/headers";

/* Created at a time where when passing function from server 
   to client component resulted into a linting error.
   * This is just a bypass to the error.
*/

export async function setCookieTheme(setTheme: string) {
  cookies().set("theme", setTheme);
}
