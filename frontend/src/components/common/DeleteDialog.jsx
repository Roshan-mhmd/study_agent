import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";

function DeleteDialog({
  open,
  filename,
  onClose,
  onConfirm
}) {

  return (

    <Dialog
      open={open}
      onClose={onClose}
    >

      <DialogTitle>

        Delete Document

      </DialogTitle>

      <DialogContent>

        <DialogContentText>

          Are you sure you want to delete

          <strong>
            {" "}{filename}
          </strong>

          ?

          <br /><br />

          This action cannot be undone.

        </DialogContentText>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default DeleteDialog;