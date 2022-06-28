import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(moviesGetAll());
    dispatch(membersGetAll());
    dispatch(subscriptionsGetAll());
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
                disabled={user.username === "Admin" ? false : true}
              >
                Employees
              </Button>
            </Box>
            <Box>{/* <HelloUser /> */}</Box>
            <Box>
              <Tooltip title="Log Out">
                <IconButton
                  component={Button}
                  onClick={onLogout}
                  edge="end"
                  sx={{ marginLeft: 1 }}
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
