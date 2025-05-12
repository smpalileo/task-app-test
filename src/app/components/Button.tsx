"use client";
import { Button, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function MainButton({ text = "Get Started" }: { text?: string }) {
  const handleClick = () => {
    return redirect("/tasks");
  };
  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        endIcon={<ArrowForwardRoundedIcon />}
      >
        {text}
      </Button>
    </div>
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
    setIsModalOpen({ state: true, isNew: true });
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

export function EditButton() {
  const { setIsModalOpen } = useContext(AppContext);
  const handleClick = () => {
    setIsModalOpen({ state: true, isNew: false });
  };
  return (
    <IconButton
      onClick={handleClick}
      aria-label="edit"
    >
      <EditIcon />
    </IconButton>
  );
}

export function DeleteButton({ handleDelete }: { handleDelete: () => void }) {
  return (
    <Button
      color="error"
      variant="outlined"
      onClick={handleDelete}
      endIcon={<DeleteIcon />}
    >
      {"Delete"}
    </Button>
  );
}
