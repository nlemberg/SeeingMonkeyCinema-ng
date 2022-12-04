import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://seeing-monkey-cinema.onrender.com/employees"
    : "http://localhost:8000/employees";

// login
const login = (userData) => async (dispatch) => {
  try {
    const { data: user } = await axios.post(url + "/login", userData);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.removeItem("user");
    dispatch({ type: "LOGIN_FAIL", payload: message });
  }
};

// log out
const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT_SUCCESS" });
};

// reset
const reset = () => async (dispatch) => {
  dispatch({ type: "RESET" });
};

export { login, logout, reset };
