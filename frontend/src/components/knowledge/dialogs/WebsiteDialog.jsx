import { useState } from "react";

import api from "../../../services/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  LinearProgress
} from "@mui/material";

function WebsiteDialog({

  open,

  onClose,

  onSuccess

}) {

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const crawlWebsite = async () => {

    if (!url.trim()) return;

    try {

      setLoading(true);

      await api.post("/crawl", {

        url

      });

      setUrl("");

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

        Crawl Website

      </DialogTitle>

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <TextField

            label="Website URL"

            placeholder="https://example.com"

            value={url}

            onChange={(e)=>setUrl(e.target.value)}

            fullWidth

          />

          {

            loading &&

            <LinearProgress/>

          }

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>

          Cancel

        </Button>

        <Button

          variant="contained"

          disabled={loading || !url}

          onClick={crawlWebsite}

        >

          Crawl

        </Button>

      </DialogActions>

    </Dialog>

  );

}

export default WebsiteDialog;