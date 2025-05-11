/* eslint-disable react/no-unescaped-entities */
import { currentUser } from "@clerk/nextjs/server";
import { MainButton } from "./components/Button";

export default async function Home() {
  const user = await currentUser();
  const userName =
    user?.firstName || user?.emailAddresses[0].emailAddress.split("@")[0];

  return (
    <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div className="gap-y-8 flex flex-col">
        <div className="text-xl text-black dark:text-white">
          Welcome, {userName}!
        </div>
        <div className="text-lg text-black dark:text-white">
          If you're seeing this, that means you've successfully logged in!
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          This is a simple task management app built with Next.js, Clerk (for
          authentication) and MongoDB.
        </p>
        <MainButton />
      </div>
    </div>
  );
}
