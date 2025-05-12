"use client";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState } from "react";
import { AppContext } from "../tasks/page";
import { ClearButton, SubmitButton } from "./Button";
import DatePickerComponent from "./DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { MuiChipsInput } from "mui-chips-input";

export const DialogComponent = ({ title }: { title: string }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isModalOpen, setIsModalOpen, tasks, setTasks } =
    useContext(AppContext);

  const initialState = {
    name: "",
    description: "",
    deadline: undefined,
    tags: [],
    completed: false,
  };

  const alertState = {
    text: "",
    success: true,
  };

  const [props, setProps] = useState(initialState);
  const [isSubmitting, setSubmitState] = useState(false);
  const [alertText, setAlertText] = useState(alertState);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleClear = () => {
    setProps(initialState);
  };

  const handleChange = ({
    prop,
    value,
  }: {
    prop: string;
    value: string | string[];
  }) => {
    setProps({ ...props, [prop]: value });
  };

  const handleSubmit = async () => {
    setSubmitState(true);
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
        }, 3000);
      } else {
        setAlertText({
          text: "Successfully created new task!",
          success: true,
        });
        setTimeout(() => {
          setTasks([res as never, ...tasks]);
          console.log("SHOULD UPDATE", tasks);
          setAlertText(alertState);
          setSubmitState(false);
          handleClose();
          handleClear();
        }, 3000);
      }
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isModalOpen}
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
              onChange={(e) =>
                handleChange({ prop: "name", value: e.target.value })
              }
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
              onChange={(e) =>
                handleChange({ prop: "description", value: e.target.value })
              }
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
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <ClearButton
          isSubmitting={isSubmitting}
          handleClick={handleClear}
        />
        <SubmitButton
          isSubmitting={isSubmitting}
          handleClick={handleSubmit}
        />
      </DialogActions>
    </Dialog>
  );
};
