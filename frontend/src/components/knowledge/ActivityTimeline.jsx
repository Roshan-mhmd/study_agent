import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider
} from "@mui/material";

import HistoryIcon from "@mui/icons-material/History";

const activities = [

  "Uploaded Prospectus.pdf",

  "Indexed Admission.pdf",

  "Knowledge Base Updated"

];

function ActivityTimeline() {

  return (

    <Card elevation={3}>

      <CardContent>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >

          <HistoryIcon color="primary"/>

          <Typography variant="h6">

            Recent Activity

          </Typography>

        </Stack>

        {

          activities.map((item,index)=>(

            <div key={index}>

              <Typography
                sx={{py:1}}
              >

                ✓ {item}

              </Typography>

              {

                index!==activities.length-1&&

                <Divider/>

              }

            </div>

          ))

        }

      </CardContent>

    </Card>

  );

}

export default ActivityTimeline;