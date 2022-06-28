import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { Routes, Route, Link, useHistory } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { useSelector } from "react-redux";
// import AddMovie from "./addMovie";
// import EditMovie from "./editMovie";

const Movies = () => {
  // const history = useHistory()

  // let addMovieLink = null;

  // if (!sessionStorage.getItem("employeePermissions").includes("viewMovies")) {
  //     history.push("/home/access-denied")
  // }

  // if (sessionStorage.getItem("employeePermissions").includes("createMovies")) {
  //     addMovieLink = <Button variant="text" component={Link} to={"/addMovie"} >Add Movie</Button>
  //     // addMovieLink = <Button variant="text" component={Link} to={`${props.match.url}/addMovie`} >Add Movie</Button>
  // }
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
            {/* <Button variant="text" component={Link} to="/home/movies/allMovies"> */}
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
          {/* {addMovieLink} */}
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Movies;
