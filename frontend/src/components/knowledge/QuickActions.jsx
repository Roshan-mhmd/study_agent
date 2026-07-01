import WebsiteDialog from "./dialogs/WebsiteDialog";
import { useState } from "react";
import ManualDialog from "./dialogs/ManualDialog";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LanguageIcon from "@mui/icons-material/Language";
import EditNoteIcon from "@mui/icons-material/EditNote";

import UploadDialog from "./dialogs/UploadDialog";

function QuickActions({ onRefresh }) {
const [uploadOpen, setUploadOpen] = useState(false);
 const [websiteOpen, setWebsiteOpen] = useState(false);
 const [manualOpen, setManualOpen] = useState(false);
  const actions = [

    {
      title: "Upload PDF",
      description: "Upload new documents",
      icon: <PictureAsPdfIcon color="error" />,
      button: "Upload"
    },

    {
      title: "Crawl Website",
      description: "Index website pages",
      icon: <LanguageIcon color="primary" />,
      button: "Crawl"
    },

    {
      title: "Manual Knowledge",
      description: "Add manual notes",
      icon: <EditNoteIcon color="success" />,
      button: "Add"
    }

  ];

  return (

    <>

      <Stack
        direction="row"
        spacing={3}
        sx={{
          flexWrap: "wrap"
        }}
      >

        {actions.map((action, index) => (

          <Card
            key={index}
            sx={{
              flex: 1,
              minWidth: 260,
              borderRadius: 3
            }}
          >

            <CardContent>

              <Stack
                spacing={2}
                alignItems="center"
              >

                {action.icon}

                <Typography variant="h6">

                  {action.title}

                </Typography>

                <Typography
                  color="text.secondary"
                  align="center"
                >

                  {action.description}

                </Typography>

                <Button
                  variant="contained"
                  onClick={() => {

    if (index === 0) {

        setUploadOpen(true);

    }

    else if (index === 1) {

        setWebsiteOpen(true);

    }

    else if (index === 2) {

        setManualOpen(true);

    }
}}
                >

                  {action.button}

                </Button>

              </Stack>

            </CardContent>

          </Card>

        ))}

      </Stack>

      <UploadDialog

        open={uploadOpen}

        onClose={() => setUploadOpen(false)}

        onSuccess={() => {

          if (onRefresh) {

            onRefresh();

          }

        }}

      />
    <WebsiteDialog

    open={websiteOpen}

    onClose={() => setWebsiteOpen(false)}

    onSuccess={() => {

        onRefresh?.();

    }}

/>
<ManualDialog

    open={manualOpen}

    onClose={() => setManualOpen(false)}

    onSuccess={() => {

        onRefresh?.();

    }}

/>
    </>

  );

}

export default QuickActions;