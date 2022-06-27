import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/actions/authActions";
import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isError) {
      alert(message);
      dispatch(reset());
    }
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isAuthenticated || user) {
      navigate("/welcomeHome");
    }
  }, [user, isAuthenticated, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };

  //   const loginAsGuest = (e) => {
  //     e.preventDefault();
  //     const userData = {
  //       username: "Guest",
  //     };
  //     dispatch(login(userData));
  //   };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper className="paperLogin">
          <FaceIcon className="faceIcon" />
          <Typography className="welcome"> Welcome, </Typography>
          <Typography className="stranger"> Stranger </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            component="form"
            onSubmit={onSubmit}
          >
            <TextField
              label="username"
              className="txtFldLogin"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              label="Password"
              className="txtFldLogin"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
            <Button type="submit" className="btnLogin">
              Log in
            </Button>
            {/* <Button onClick={loginAsGuest} className="btnLogin">
              Log in as Guest
            </Button> */}
            {/* <Typography>
              {" "}
              New here?{" "}
              {
                <Typography
                  className="txtLink"
                  component={Link}
                  to="/createAccount"
                >
                  Create account
                </Typography>
              }{" "}
            </Typography> */}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
