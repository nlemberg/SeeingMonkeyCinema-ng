import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Employee from "./employee";
import { employeesGetAll } from "../../redux/actions/employeeActions";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/actions/authActions";

const AllEmployees = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   //   const { user } = useSelector((state) => state.auth);
  //   const { user, isError, message } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     if (user.username === "Admin") {
  //       dispatch(employeesGetAll);
  //     } else {
  //       navigate("/accessDenied");
  //     }
  //   }, [isError, message, dispatch, user, navigate]);

  //   useEffect(() => {
  //     if (!user) {
  //       navigate("/login");
  //     } else {
  //       dispatch(moviesGetAll());
  //       dispatch(membersGetAll());
  //       dispatch(subscriptionsGetAll());
  //       setDisableBtn(user.username === "Admin" || "Guest" ? false : true);
  //     }
  //     return () => {
  //       dispatch(reset());
  //     };
  //   }, [user, navigate, dispatch]);

  //   useEffect(() => {
  //     if (user.username !== "Admin") {
  //       alert("Only the system Admin is allowed to manage employees");
  //       navigate("../../welcomeHome");
  //     }
  //   }, [user, navigate]);

  //   useEffect(() => {
  //     if (user.username === "Admin") {
  //       dispatch(employeesGetAll());
  //     }
  //   }, [user, dispatch]);

  //   useEffect(() => {
  //     if (user.username === "Admin") {
  //       dispatch(employeesGetAll());
  //       // } else if (user.username === "Guest") {
  //       //   return "Temp employee";
  //     } else {
  //       alert("Only the system Admin is allowed to manage employees");
  //       navigate("../../welcomeHome");
  //     }
  //   }, [user, navigate, dispatch]);

  const employees = useSelector((state) => state.employees);

  const employeeComp = employees.map((employee) => {
    return (
      <Grid item key={employee._id} display="flex" xs={12} sm={6} md={4}>
        <Employee employee={employee} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2} justifyContent="center">
      {employeeComp}
    </Grid>
  );
};

export default AllEmployees;
