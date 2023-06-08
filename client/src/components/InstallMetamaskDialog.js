import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function InstallMetamaskDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Hướng dẫn cài đặt Metamask"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn cần cài đặt Metamask ở đường link:{" "}
          <Button
            variant="text"
            onClick={() => {
              window.open("https://metamask.io/", "_blank").focus();
            }}
          >
            https://metamask.io/
          </Button>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}
