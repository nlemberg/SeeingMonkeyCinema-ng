import React from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./login/login"
import Home from "./home";
// import CreateAccount from "./login/createAccount";
// import { useDispatch } from "react-redux";
// import { employeesGetAll } from "../redux/actions/employeeActions";
// import { employeeLoginsGetAll } from "../redux/actions/employeeLoginActions";
// import { permissionsGetAll } from "../redux/actions/permissionActions";
// import { combinedEmployeesCreateAll } from "../redux/actions/combinedEmployeeActions";
// import { moviesGetAll } from "../redux/actions/movieActions";
// import { membersGetAll } from "../redux/actions/memberActions";
// import { subscriptionsGetAll } from "../redux/actions/subscriptionActions";
import { Box } from "@mui/material";
import WelcomeHome from "./welcomeHome";
import Movies from "./movies/movies";
import AllMovies from "./movies/allMovies";
import Movie from "./movies/movie";
import Members from "./members/members";
import AllMembers from "./members/allMembers";
import Member from "./members/member";
import Login from "./login";
import AddMember from "./members/addMember";
import EditMember from "./members/editMember";
import AddMovie from "./movies/addMovie";
import EditMovie from "./movies/editMovie";

const MainRouter = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function setMyStore() {

  //     await dispatch(moviesGetAll());
  //     await dispatch(membersGetAll());
  //     await dispatch(subscriptionsGetAll());

  //   }
  //   setMyStore();
  // }, [dispatch]);

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
            <Route path="addMovie" element={<AddMovie />} />
            <Route path="editMovie/:id" element={<EditMovie />} />
          </Route>
          <Route path="members" element={<Members />}>
            <Route path="allMembers" element={<AllMembers />} />
            <Route path=":id" element={<Member />} />
            <Route path="addMember" element={<AddMember />} />
            <Route path="editMember/:id" element={<EditMember />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route> 404 Not Found! </Route>
      </Routes>
    </Box>
  );
};

export default MainRouter;
