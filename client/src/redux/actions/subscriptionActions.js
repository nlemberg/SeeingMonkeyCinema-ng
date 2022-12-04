import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://seeing-monkey-cinema.onrender.com/subscriptions"
    : "http://localhost:8000/subscriptions";

const subscriptionsGetAll = () => async (dispatch) => {
  const { data: subscriptions } = await axios.get(url);
  dispatch({ type: "SUBSCRIPTIONS_GET_ALL", payload: subscriptions });
};

export { subscriptionsGetAll };
