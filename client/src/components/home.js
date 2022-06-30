import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../redux/actions/authActions";
import { moviesGetAll } from "../redux/actions/movieActions";
import { membersGetAll } from "../redux/actions/memberActions";
import { subscriptionsGetAll } from "../redux/actions/subscriptionActions";
// import Employees from "./employees/employees";
// import HelloUser from "./login/helloUser";
// import AccessDenied from "./accessDenied";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(moviesGetAll());
      dispatch(membersGetAll());
      dispatch(subscriptionsGetAll());
      setDisableBtn(user.username === "Admin" || "Guest" ? false : true);
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "primary.dark" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 4 }}>
              <Tooltip title="Home">
                <IconButton component={Link} to="welcomeHome" edge="start">
                  <HomeIcon fontSize="large" htmlColor="white" />
                </IconButton>
              </Tooltip>
              <Button
                variant="text"
                component={Link}
                to="movies/allMovies"
                // to={`${props.match.url}/movies/allMovies`}
              >
                Movies
              </Button>
              <Button variant="text" component={Link} to="members/allMembers">
                Members
              </Button>
              <Button
                variant="text"
                component={Link}
                to="employees/allEmployees"
                disabled={disableBtn}
              >
                Employees
              </Button>
            </Box>
            <Box>
              <Typography className="hello">Hello, {user.firstName}</Typography>
            </Box>
            <Box>
              <Tooltip title="Log Out">
                <IconButton
                  component={Button}
                  onClick={onLogout}
                  edge="end"
                  disableElevation
                  sx={{ marginLeft: 1, color: "#8FBC8F" }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default Home;
