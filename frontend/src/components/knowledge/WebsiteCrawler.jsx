import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import api from "../../services/api";
function WebsiteCrawler() {

  const [url, setUrl] = useState("");

 const handleCrawl = async () => {

    try {

        await api.post("/crawl", {

            url

        });

        alert("Website indexed successfully.");

        setUrl("");

    }

    catch(error){

        console.error(error);

        alert("Failed to crawl website.");

    }

};
  return (

    <Card elevation={3}>

      <CardContent>

        <Stack spacing={3}>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >

            <LanguageIcon color="primary"/>

            <Typography variant="h6">

              Website Crawler

            </Typography>

          </Stack>

          <Typography color="text.secondary">

            Crawl the official college website and
            index its pages into the knowledge base.

          </Typography>

          <TextField

            fullWidth

            label="Website URL"

            placeholder="https://lbscek.ac.in"

            value={url}

            onChange={(e)=>setUrl(e.target.value)}

          />

          <Button

            variant="contained"

            disabled={!url}

            onClick={handleCrawl}

          >

            Crawl Website

          </Button>

          <Alert severity="info">

            Backend integration will be added later.

          </Alert>

        </Stack>

      </CardContent>

    </Card>

  );

}

export default WebsiteCrawler;