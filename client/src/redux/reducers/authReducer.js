const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isError: false,
        message: "",
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isError: true,
        message: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        user: null,
        isError: false,
        message: "",
      };
    case "RESET":
      return {
        ...state,
        isError: false,
        isAuthenticated: false,
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
