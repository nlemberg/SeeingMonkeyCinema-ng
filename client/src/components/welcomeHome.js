import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, IconButton } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useSelector } from "react-redux";
import monkeys from "../images/monkeys1920.png";

const WelcomeHome = () => {
  const { user } = useSelector((state) => state.auth);
  const [employeeIcon, setEmployeeIcon] = useState(null);

  useEffect(() => {
    if (user && (user.username === "Admin" || "Guest")) {
      setEmployeeIcon(
        <IconButton
          aria-label="Employees"
          component={Link}
          to="../employees/allEmployees"
          sx={{ display: "flex", flexDirection: "column", flexBasis: "33%" }}
          disableRipple
        >
          <BadgeOutlinedIcon className="mainPgIcon" />
          <Typography variant="button">Employees</Typography>
        </IconButton>
      );
    }
  }, [user]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        alignItems: "center",
        textAlign: "center",
        padding: "48px",
      }}
    >
      <img
        src={monkeys}
        alt="Created by iirliinnaa from Pixabay"
        height="250px"
      />
      {/* <Typography
        variant="overline"
        color="#00796b"
        fontSize="60px"
        marginTop={6}
        marginBottom={6}
      > */}
      <Typography
        variant="h2"
        fontWeight="400"
        fontSize="55px"
        color="#003333"
        marginTop={6}
        marginBottom={6}
      >
        Seeing Monkey Cinema
      </Typography>

      <Box display="flex" minWidth="42%" justifyContent="space-around">
        <IconButton
          aria-label="Movies"
          component={Link}
          to="../movies/allMovies"
          sx={{ display: "flex", flexDirection: "column", flexBasis: "33%" }}
          disableRipple
        >
          <LocalMoviesIcon className="mainPgIcon" />
          <Typography variant="button">Movies</Typography>
        </IconButton>
        <IconButton
          aria-label="Members"
          component={Link}
          to="../members/allMembers"
          sx={{ display: "flex", flexDirection: "column", flexBasis: "33%" }}
          disableRipple
        >
          <PersonPinIcon className="mainPgIcon" />
          <Typography variant="button">Members</Typography>
        </IconButton>
        {employeeIcon}
      </Box>
    </Box>
  );
};

export default WelcomeHome;
