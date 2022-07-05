import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { moviesEdit } from "../../redux/actions/movieActions";

const EditMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const movies = useSelector((state) => state.movies);
  const movieToEdit = movies.find((movie) => movie._id === id);
  console.log(movieToEdit);
  const [movie, setMovie] = useState({
    _id: movieToEdit._id,
    name: movieToEdit.name,
    genres: movieToEdit.genres,
    image: movieToEdit.image,
    premiered: movieToEdit.premiered,
  });

  const { _id, name, genres, image, premiered } = movie;

  useEffect(() => {
    if (!user.permissions.updateMovies && !user.username === "Guest") {
      alert(
        "Oops. You don't have permission to view this page. Please contact your system Admin"
      );
      navigate("../allMovies");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      _id,
      name,
      genres,
      image,
      premiered,
    };
    await dispatch(moviesEdit(movieData));
    navigate("../allMovies");
  };

  return (
    <Box display="flex" justifyContent="center">
      <Card className="addOrEdit">
        <CardHeader title="Edit Movie" />
        <CardContent component="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <TextField
              label="Name"
              onChange={(e) => setMovie({ ...movie, name: e.target.value })}
              value={movie.name}
            />
            <TextField
              label="Generes"
              onChange={(e) =>
                setMovie({ ...movie, genres: e.target.value.split(",") })
              }
              helperText="*Please use commas to separate genres"
              value={movie.genres}
            />
            <TextField
              label="Image URL"
              onChange={(e) =>
                setMovie({ ...movie, image: { medium: e.target.value } })
              }
              type="url"
              value={movie.image.medium}
            />
            <TextField
              label="Premiere Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              onChange={(e) =>
                setMovie({ ...movie, premiered: e.target.value })
              }
              value={movie.premiered.slice(0, 10)}
            />
          </Box>
          <Box display="flex" justifyContent="center" padding={2}>
            <Button component={Link} to="../allMovies">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={user.username === "Guest" ? true : false}
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditMovie;
