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

function QuickActions() {

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

              <Typography
                variant="h6"
              >

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
              >

                {action.button}

              </Button>

            </Stack>

          </CardContent>

        </Card>

      ))}

    </Stack>

  );

}

export default QuickActions;