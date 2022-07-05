import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { employeesGetAll } from "../../redux/actions/employeeActions";

const Employees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.username === "Admin") {
      dispatch(employeesGetAll());
    } else if (user.username === "Guest") {
      navigate("./sample");
    } else {
      navigate("/accessDenied");
    }
  }, [dispatch, user, navigate]);

  return (
    <>
      <AppBar sx={{ marginBottom: 2 }} position="relative">
        <Toolbar>
          <BadgeOutlinedIcon className="appBarIcon" />
          <Button variant="text" component={Link} to="allEmployees">
            All Employees
          </Button>
          <Button variant="text" component={Link} to="./addEmployee">
            Add Employee
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Employees;
