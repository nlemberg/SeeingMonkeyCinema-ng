const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isAuthenticated: false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isError: false,
        isAuthenticated: true,
        message: "",
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isError: true,
        isAuthenticated: false,
        message: action.payload,
      };
    case "LOGOUT_SUCCESS":
    case "RESET":
      return {
        user: null,
        isError: false,
        isAuthenticated: false,
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
