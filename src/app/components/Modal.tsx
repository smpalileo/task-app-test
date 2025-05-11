import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { AppContext } from "../tasks/page";

export const DialogComponent = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { isModalOpen, setIsModalOpen } = useContext(AppContext);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
        >
          Disagree
        </Button>
        <Button
          onClick={handleClose}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
