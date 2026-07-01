import {
  Box,
  Typography,
} from "@mui/material";

function Header() {

  return (

    <Box mb={5}>

      <Typography

        variant="h4"

        fontWeight="bold"

      >

        📚 Campus Knowledge Management

      </Typography>

      <Typography

        mt={1}

        color="text.secondary"

      >

        Manage all knowledge sources powering your Campus AI Assistant.

      </Typography>

    </Box>

  );

}

export default Header;