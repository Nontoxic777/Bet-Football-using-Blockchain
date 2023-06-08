import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";

export default function GuildeDialog({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Hướng dẫn sử dụng trang web"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Để có thể tương tác và bắt đầu đặt cược ở trang web, đầu tiên bạn
            phải cài đặt và tạo 1 ví điện tử Metamask.
            <br />
            Các bạn xem hướng dẫn{" "}
            <Button
              onClick={() => {
                window
                  .open(
                    "https://www.youtube.com/watch?v=byqLBgr10Ik&ab_channel=DatTran",
                    "_blank"
                  )
                  .focus();
              }}
            >
              ở đây
            </Button>
            <br />
            Trong 1 số trường hợp, trang web bị lỗi. Các bạn nhấn F5 để thử lại
            nha
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
