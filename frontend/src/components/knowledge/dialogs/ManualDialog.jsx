import { useState } from "react";

import api from "../../../services/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  LinearProgress
} from "@mui/material";

function ManualDialog({

  open,

  onClose,

  onSuccess

}) {

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const saveKnowledge = async () => {

    if (!title.trim() || !content.trim()) return;

    try {

      setLoading(true);

      await api.post("/manual-note", {

        title,

        content

      });

      setTitle("");

      setContent("");

      onSuccess?.();

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
      maxWidth="md"
    >

      <DialogTitle>

        Manual Knowledge

      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <TextField

            label="Title"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

            fullWidth

          />

          <TextField

            label="Knowledge"

            multiline

            rows={8}

            value={content}

            onChange={(e)=>setContent(e.target.value)}

            fullWidth

          />

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

          disabled={loading}

          onClick={saveKnowledge}

        >

          Save

        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default ManualDialog;