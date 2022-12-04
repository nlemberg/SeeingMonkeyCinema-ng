import axios from "axios";
import { subscriptionsGetAll } from "./subscriptionActions";

const url =
  process.env.NODE_ENV === "production"
    ? "https://attractive-ring-tuna.cyclic.app/movies"
    : "http://localhost:8000/movies";

const moviesGetAll = () => async (dispatch) => {
  const { data: movies } = await axios.get(url);
  dispatch({ type: "MOVIES_GET_ALL", payload: movies });
};

const moviesAddNew = (newMovie) => async (dispatch) => {
  const response = await axios.post(url, newMovie);
  await dispatch(moviesGetAll());
  if (response.status === 200) {
    alert("Movie added");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const moviesEdit = (movie) => async (dispatch) => {
  const response = await axios.put(`${url}/${movie._id}`, movie);
  await dispatch(moviesGetAll());
  if (response.status === 200) {
    alert("Movie updated successfully");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const moviesDelete = (id) => async (dispatch) => {
  const response = await axios.delete(`${url}/${id}`);
  await dispatch(moviesGetAll());
  await dispatch(subscriptionsGetAll());
  if (response.status === 200) {
    alert("Movie deleted");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

export { moviesGetAll, moviesAddNew, moviesEdit, moviesDelete };
