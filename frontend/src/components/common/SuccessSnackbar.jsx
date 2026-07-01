import {
  Snackbar,
  Alert
} from "@mui/material";

function SuccessSnackbar({
  open,
  message,
  onClose
}) {

  return (

    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >

      <Alert
        severity="success"
        variant="filled"
        onClose={onClose}
      >

        {message}

      </Alert>

    </Snackbar>

  );

}

export default SuccessSnackbar;