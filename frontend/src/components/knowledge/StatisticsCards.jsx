import {
  Stack,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import ExtensionIcon from "@mui/icons-material/Extension";
import LanguageIcon from "@mui/icons-material/Language";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function StatisticsCards({ stats }) {

  const cards = [

    {
      title: "Documents",
      value: stats.documents,
      icon: <DescriptionIcon color="primary" />
    },

    {
      title: "Chunks",
      value: stats.chunks,
      icon: <ExtensionIcon color="success" />
    },

    {
      title: "Website",
      value: stats.website_chunks,
      icon: <LanguageIcon color="info" />
    },

    {
      title: "Embedding",
      value: stats.embedding_model,
      icon: <SmartToyIcon color="secondary" />
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

      {cards.map((card, index) => (

        <Card
          key={index}
          sx={{
            flex: 1,
            minWidth: 220,
            borderRadius: 3
          }}
        >

          <CardContent>

            <Stack
              spacing={2}
              alignItems="center"
            >

              {card.icon}

              <Typography
                variant="h5"
                fontWeight="bold"
              >

                {card.value}

              </Typography>

              <Typography
                color="text.secondary"
              >

                {card.title}

              </Typography>

            </Stack>

          </CardContent>

        </Card>

      ))}

    </Stack>

  );

}

export default StatisticsCards;