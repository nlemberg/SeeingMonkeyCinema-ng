import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./login/login"
import Home from "./home";
// import CreateAccount from "./login/createAccount";
import { useDispatch } from "react-redux";
// import { employeesGetAll } from "../redux/actions/employeeActions";
// import { employeeLoginsGetAll } from "../redux/actions/employeeLoginActions";
// import { permissionsGetAll } from "../redux/actions/permissionActions";
// import { combinedEmployeesCreateAll } from "../redux/actions/combinedEmployeeActions";
import { moviesGetAll } from "../redux/actions/movieActions";
import { membersGetAll } from "../redux/actions/memberActions";
import { subscriptionsGetAll } from "../redux/actions/subscriptionActions";
import { Box } from "@mui/material";
import WelcomeHome from "./welcomeHome";
import Movies from "./movies/movies";
import AllMovies from "./movies/allMovies";
import Movie from "./movies/movie";
import Members from "./members/members";
import AllMembers from "./members/allMembers";
import Member from "./members/member";

const MainRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function setMyStore() {
      // async function getDbData() {
      // await dispatch(employeesGetAll())
      // await dispatch(employeeLoginsGetAll())
      // await dispatch(permissionsGetAll())
      await dispatch(moviesGetAll());
      await dispatch(membersGetAll());
      await dispatch(subscriptionsGetAll());
      // }
      // await getDbData();
      // await dispatch(combinedEmployeesCreateAll())
    }
    setMyStore();
  }, [dispatch]);

  return (
    <Box>
      <Routes>
        {/* <Route path="/" exact component={Login} /> */}
        {/* <Route path="/createAccount" component={CreateAccount} /> */}
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/" element={<Home />}>
          <Route path="welcomeHome" element={<WelcomeHome />} />
          <Route path="movies" element={<Movies />}>
            <Route path="allMovies" element={<AllMovies />} />
            <Route path=":id" element={<Movie />} />
          </Route>
          <Route path="members" element={<Members />}>
            <Route path="allMembers" element={<AllMembers />} />
            <Route path=":id" element={<Member />} />
          </Route>
        </Route>
        {/* <Route path="welcomeHome" element={<WelcomeHome />} /> */}
        <Route> 404 Not Found! </Route>
      </Routes>
    </Box>
  );
};

export default MainRouter;
