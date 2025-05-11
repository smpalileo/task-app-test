"use client";
import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
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
    <Button
      onClick={handleClick}
      variant="contained"
    >
      {text}
      <ArrowForwardRoundedIcon />
    </Button>
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
      <ArrowBackRoundedIcon />
      {text}
    </button>
  );
}
