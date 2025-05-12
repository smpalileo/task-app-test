"use client";
import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
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

export function SubmitButton({
  text = "Submit",
  handleClick,
  isSubmitting,
}: {
  text?: string;
  handleClick: () => unknown;
  isSubmitting: boolean;
}) {
  return (
    <Button
      color="success"
      onClick={handleClick}
      variant="contained"
      loading={isSubmitting}
      endIcon={<CheckCircleOutlineRoundedIcon />}
    >
      {text}
    </Button>
  );
}

export function ClearButton({
  text = "Clear",
  handleClick,
  isSubmitting = false,
}: {
  text?: string;
  handleClick: () => unknown;
  isSubmitting: boolean;
}) {
  return (
    <Button
      color="primary"
      onClick={handleClick}
      variant="outlined"
      startIcon={<RotateLeftRoundedIcon />}
      disabled={isSubmitting}
    >
      {text}
    </Button>
  );
}
