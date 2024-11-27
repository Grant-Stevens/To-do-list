import * as React from "react";
import Button from "../button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import s from "./confirmation-dialog.module.scss";

export interface ConfirmationDialogProps extends React.PropsWithChildren {
  id?: string;
  keepMounted?: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, value: valueProp, open, children, ...other } = props;
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={handleCancel}
      {...other}
    >
      <DialogTitle>Delete task?</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button mode="secondary" autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={s.dangerous} onClick={handleOk}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
