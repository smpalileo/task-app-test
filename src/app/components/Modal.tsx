"use client";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { ClearButton, DeleteButton, SubmitButton } from "./Button";
import DatePickerComponent from "./DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { MuiChipsInput } from "mui-chips-input";
import dayjs from "dayjs";
import { HydratedDocument } from "mongoose";
import { ITask } from "../models/Task";

const initialState = {
  _id: "",
  name: "",
  description: "",
  deadline: undefined,
  tags: [],
  completed: false,
};

export const DialogComponent = ({ title }: { title: string }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isModalOpen, setIsModalOpen, tasks, setTasks, props, setProps } =
    useContext(AppContext);

  const alertState = {
    text: "",
    success: true,
  };

  const [isSubmitting, setSubmitState] = useState(false);
  const [alertText, setAlertText] = useState(alertState);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleClose = () => {
    setProps(initialState);
    setIsModalOpen({ state: false, isNew: true });
  };

  const handleClear = () => {
    setProps(initialState);
  };

  const handleChange = ({
    prop,
    value,
  }: {
    prop: string;
    value: string | string[] | boolean;
  }) => {
    setProps({ ...props, [prop]: value });
  };

  const handleSubmit = async () => {
    if (nameError || descriptionError) {
      setAlertText({
        text: "Validation error!",
        success: false,
      });
      setTimeout(() => {
        setAlertText(alertState);
      }, 3000);
    } else {
      setSubmitState(true);
      if (isModalOpen.isNew) {
        await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(props),
        }).then(async (response) => {
          const res = await response.json();
          if (res.error) {
            setAlertText({
              text: "Error creating new task!",
              success: false,
            });
            setTimeout(() => {
              setAlertText(alertState);
              setSubmitState(false);
            }, 3000);
          } else {
            setAlertText({
              text: "Successfully created new task!",
              success: true,
            });
            setTimeout(() => {
              setTasks([res as never, ...tasks]);
              setAlertText(alertState);
              setSubmitState(false);
              handleClose();
              handleClear();
            }, 3000);
          }
        });
      } else {
        const updateBody = {
          ...props,
          deadline: props.deadline
            ? dayjs(props.deadline).format("YYYY-MM-DD")
            : undefined,
        };
        await fetch(`/api/tasks/${props._id}`, {
          method: "PATCH",
          body: JSON.stringify(updateBody),
        }).then(async (response) => {
          const res = await response.json();
          if (res.error) {
            setAlertText({
              text: "Error updating task!",
              success: false,
            });
            setTimeout(() => {
              setAlertText(alertState);
              setSubmitState(false);
            }, 3000);
          } else {
            setAlertText({
              text: "Successfully updated task!",
              success: true,
            });
            setTimeout(() => {
              const updatedTasks: Array<HydratedDocument<ITask>> = tasks.map(
                (task: HydratedDocument<ITask>) => {
                  if (res._id === task._id) return res;
                  return task;
                },
              );
              setTasks(updatedTasks as unknown as never);
              setAlertText(alertState);
              setSubmitState(false);
              handleClose();
              handleClear();
            }, 3000);
          }
        });
      }
    }
  };

  const handleDelete = async () => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ _id: props._id }),
    }).then(async (response) => {
      const res = await response.json();
      if (res.error) {
        setAlertText({
          text: "Error deleting task!",
          success: false,
        });
        setTimeout(() => {
          setAlertText(alertState);
        }, 3000);
      } else {
        setAlertText({
          text: "Successfully deleted task!",
          success: true,
        });
        setTimeout(() => {
          const reducedTasks: Array<HydratedDocument<ITask>> = tasks.filter(
            (task: HydratedDocument<ITask>) =>
              task._id.toString() !== props._id,
          );
          setTasks(reducedTasks as unknown as never);
          setAlertText(alertState);
          setSubmitState(false);
          handleClose();
          handleClear();
        }, 3000);
      }
    });
  };

  useEffect(() => {
    if (props.name === "") setNameError(true);
    else setNameError(false);
    if (props.description === "") setDescriptionError(true);
    else setDescriptionError(false);
  }, [props.name, props.description]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isModalOpen.state}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Box
          display="flex"
          alignItems="center"
        >
          <Box flexGrow={1}>{title}</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {alertText.text === "" ? undefined : alertText.success ? (
          <Alert severity="success">{alertText.text}</Alert>
        ) : (
          <Alert severity="error">{alertText.text}</Alert>
        )}
        <Box
          component="form"
          sx={{
            width: "auto",
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          display="flex-col"
          alignItems="center"
        >
          <Grid
            container
            spacing={2}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              value={props.name ?? ""}
              onChange={(e) =>
                handleChange({ prop: "name", value: e.target.value })
              }
              error={nameError}
              helperText={"Name is required"}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              fullWidth
              variant="standard"
              value={props.description ?? ""}
              onChange={(e) =>
                handleChange({ prop: "description", value: e.target.value })
              }
              error={descriptionError}
              helperText={"Description is required"}
            />
            <MuiChipsInput
              label={"Tags"}
              value={props.tags}
              onChange={(tags) => handleChange({ prop: "tags", value: tags })}
            />
            <DatePickerComponent
              handleAccept={handleChange}
              value={props.deadline ?? null}
            />
            {!isModalOpen.isNew && isModalOpen.state && (
              <FormGroup>
                <FormControlLabel
                  required
                  control={
                    <Switch
                      checked={props.completed}
                      onChange={(e, checked) =>
                        handleChange({
                          prop: "completed",
                          value: checked,
                        })
                      }
                    />
                  }
                  label="Completed"
                />
              </FormGroup>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        {isModalOpen.isNew && (
          <ClearButton
            isSubmitting={isSubmitting}
            handleClick={handleClear}
          />
        )}
        <SubmitButton
          isSubmitting={isSubmitting}
          handleClick={handleSubmit}
        />
        {!isModalOpen.isNew && <DeleteButton handleDelete={handleDelete} />}
      </DialogActions>
    </Dialog>
  );
};
