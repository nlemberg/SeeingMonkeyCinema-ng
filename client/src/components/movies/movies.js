import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useSelector } from "react-redux";

const Movies = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.permissions.viewMovies) {
      alert(
        "Oops. You don't have permission to view this page. Please contact your system Admin"
      );
      navigate("../welcomeHome");
    }
  }, [user, navigate]);

  return (
    <div>
      <AppBar sx={{ marginBottom: 2 }}>
        <Toolbar>
          <LocalMoviesIcon className="appBarIcon" />
          <Button variant="text" component={Link} to="allMovies">
            All Movies
          </Button>
          <Button
            variant="text"
            component={Link}
            to="./addMovie"
            disabled={
              user.username === "Guest" || user.permissions.createMovies
                ? false
                : true
            }
          >
            Add Movie
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Movies;
