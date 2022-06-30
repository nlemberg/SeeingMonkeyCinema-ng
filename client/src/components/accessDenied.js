import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    // <Container >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
      padding={4}
      textAlign="center"
    >
      <Typography variant="h4">
        Oops. You're not allowed to view this page
      </Typography>
      <Typography variant="h5">
        Please contact your network administrator
      </Typography>
      <Box display="flex" sx={{ marginTop: 5 }}>
        <Tooltip title="Movies">
          <IconButton component={Link} to="../movies/allMovies">
            <LocalMoviesIcon className="mainPgIcon" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Members">
          <IconButton component={Link} to="../members/allMembers">
            <PersonPinIcon className="mainPgIcon" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
    // </Container>
  );
};

export default AccessDenied;
