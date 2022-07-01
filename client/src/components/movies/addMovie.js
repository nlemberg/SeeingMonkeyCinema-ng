import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { moviesAddNew } from "../../redux/actions/movieActions";

const AddMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [newMovie, setNewMovie] = useState({
    name: "",
    genres: [],
    image: { medium: "" },
    premiered: "",
  });

  const { name, genres, image, premiered } = newMovie;

  useEffect(() => {
    if (!user.permissions.createMovies && !user.username === "Guest") {
      alert(
        "Oops. You don't have permission to view this page. Please contact your system Admin"
      );
      navigate("../allMovies");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      name,
      genres,
      image,
      premiered,
    };
    await dispatch(moviesAddNew(movieData));
    navigate("../allMovies");
  };

  return (
    <Box display="flex" justifyContent="center">
      <Card className="addOrEdit">
        <CardHeader title="Add New Movie" />
        <CardContent component="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <TextField
              label="Name"
              onChange={(e) =>
                setNewMovie({ ...newMovie, name: e.target.value })
              }
            />
            <TextField
              label="Generes"
              onChange={(e) =>
                setNewMovie({ ...newMovie, genres: e.target.value.split(",") })
              }
              helperText="*Please use commas to separate genres"
            />
            <TextField
              label="Image URL"
              onChange={(e) =>
                setNewMovie({ ...newMovie, image: { medium: e.target.value } })
              }
              type="url"
            />
            <TextField
              label="Premiere Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              onChange={(e) =>
                setNewMovie({ ...newMovie, premiered: e.target.value })
              }
            />
          </Box>
          <Box display="flex" justifyContent="center" padding={2}>
            <Button component={Link} to="../allMovies">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={user.permissions.createMovies ? false : true}
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddMovie;
