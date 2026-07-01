import { useState } from "react";

import api from "../../../services/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  LinearProgress
} from "@mui/material";

function UploadDialog({

  open,

  onClose,

  onSuccess

}) {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {

    if (!file) return;

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setFile(null);

      onSuccess();

      onClose();

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <Dialog

      open={open}

      onClose={onClose}

      fullWidth

      maxWidth="sm"

    >

      <DialogTitle>

        Upload PDF

      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <Button

            component="label"

            variant="outlined"

          >

            Choose PDF

            <input

              hidden

              type="file"

              accept=".pdf"

              onChange={(e)=>setFile(e.target.files[0])}

            />

          </Button>

          {

            file &&

            <Typography>

              {file.name}

            </Typography>

          }

          {

            loading &&

            <LinearProgress/>

          }

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button

          onClick={onClose}

        >

          Cancel

        </Button>

        <Button

          variant="contained"

          disabled={!file || loading}

          onClick={uploadFile}

        >

          Upload

        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default UploadDialog;