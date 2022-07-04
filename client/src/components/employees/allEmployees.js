import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Employee from "./employee";

const AllEmployees = () => {
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
