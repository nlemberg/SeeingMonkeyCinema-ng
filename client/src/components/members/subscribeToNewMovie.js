import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { membersEditSubscription } from "../../redux/actions/memberActions";

const SubscribeToNewMovie = ({ watchedIdsArr, memberId, callback }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (user.permissions.updateSubscriptions) {
      setDisableBtn(false);
    }
  }, [user]);

  const movies = useSelector((state) => state.movies);

  const moviesNotWatched = movies.filter((movie) =>
    watchedIdsArr.includes(movie._id) ? null : movie
  );

  const movieOption = moviesNotWatched.map((movie) => (
    <MenuItem key={movie._id + "available"} value={movie._id}>
      {movie.name}
    </MenuItem>
  ));

  const [movieToWatch, setMovieToWatch] = useState({
    movieID: "",
    dateWatched: new Date().toISOString().slice(0, 10),
  });

  const { movieID, dateWatched } = movieToWatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movieToWatch.movieID || !movieToWatch.dateWatched) {
      alert("Please select both movie and date.");
    } else {
      const movieData = { movieID, dateWatched };
      await dispatch(membersEditSubscription(memberId, movieData));
      await callback(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex">
      <FormControl>
        <TextField
          select
          label="Select Movie"
          value={movieID}
          onChange={(e) =>
            setMovieToWatch({ ...movieToWatch, movieID: e.target.value })
          }
        >
          {movieOption}
        </TextField>
        <TextField
          type="date"
          label="Date"
          value={dateWatched}
          onChange={(e) =>
            setMovieToWatch({ ...movieToWatch, dateWatched: e.target.value })
          }
        />
        <Button
          type="submit"
          disabled={disableBtn}
          sx={{ backgroundColor: "primary.dark" }}
        >
          Subscribe
        </Button>
      </FormControl>
    </Box>
  );
};

export default SubscribeToNewMovie;
