"use client";
import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../tasks/page";

export function MainButton({ text = "Get Started" }: { text?: string }) {
  const handleClick = () => {
    return redirect("/tasks");
  };
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      endIcon={<ArrowForwardRoundedIcon />}
    >
      {text}
    </Button>
  );
}

export function BackButton({ text = "Back" }: { text?: string }) {
  const handleClick = () => {
    return redirect("/");
  };
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      startIcon={<ArrowBackRoundedIcon />}
    >
      {text}
    </Button>
  );
}

export function AddButton({ text = "Create" }: { text?: string }) {
  const { setIsModalOpen } = useContext(AppContext);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  return (
    <Button
      color="success"
      onClick={handleClick}
      variant="contained"
      endIcon={<AddCircleRoundedIcon />}
    >
      {text}
    </Button>
  );
}
