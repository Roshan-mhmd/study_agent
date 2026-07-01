import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  Stack,
  Chip
} from "@mui/material";

function DocumentViewer({ open, onClose, document }) {

  if (!document) return null;

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>

        Knowledge Details

      </DialogTitle>

      <DialogContent>

        <Stack spacing={2}>

          <Typography variant="h6">

            {document.name}

          </Typography>

          <Divider/>

          <Chip
            label={document.type}
          />

          <Typography>

            Chunks : {document.chunks}

          </Typography>

        </Stack>

      </DialogContent>

    </Dialog>

  );

}

export default DocumentViewer;