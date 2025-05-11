"use client";
import { redirect, usePathname, useRouter } from "next/navigation";

export function MainButton({ text = "Get Started" }: { text?: string }) {
  const pathname = usePathname();

  const handleClick = () => {
    console.log("Main button clicked", pathname);
    switch (pathname) {
      case "/":
        return redirect("/tasks");
      case "/tasks":
        return;
      default:
        break;
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-sky-500 hover:bg-sky-700"
    >
      {text}
    </button>
  );
}

export function BackButton({ text = "Back" }: { text?: string }) {
  const router = useRouter();
  const handleClick = () => {
    console.log("Back button clicked");
    return router.back();
  };
  return (
    <button
      onClick={handleClick}
      className="bg-sky-500 hover:bg-sky-700"
    >
      {text}
    </button>
  );
}
