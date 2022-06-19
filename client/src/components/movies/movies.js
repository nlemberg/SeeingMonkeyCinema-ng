import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { Routes, Route, Link, useHistory } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
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

  return (
    <div>
      <AppBar sx={{ marginBottom: 2 }}>
        <Toolbar>
          <LocalMoviesIcon className="appBarIcon" />
          <Button variant="text" component={Link} to="allMovies">
            {/* <Button variant="text" component={Link} to="/home/movies/allMovies"> */}
            All Movies
          </Button>
          {/* {addMovieLink} */}
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Movies;
