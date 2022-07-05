import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
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
import Employees from "./employees/employees";
import AllEmployees from "./employees/allEmployees";
import Employee from "./employees/employee";
import AccessDenied from "./accessDenied";
import AddEmployee from "./employees/addEmployee";
import EditEmployee from "./employees/editEmployee";
import SampleAddEmployee from "./employees/sampleAddEmployee";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="welcomeHome" element={<WelcomeHome />} />
        <Route path="accessDenied" element={<AccessDenied />} />
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
        <Route path="employees" element={<Employees />}>
          <Route path="allEmployees" element={<AllEmployees />} />
          <Route path=":id" element={<Employee />} />
          <Route path="addEmployee" element={<AddEmployee />} />
          <Route path="sample" element={<SampleAddEmployee />} />
          <Route path="editEmployee/:id" element={<EditEmployee />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route> 404 Not Found! </Route>
    </Routes>
  );
};

export default MainRouter;
