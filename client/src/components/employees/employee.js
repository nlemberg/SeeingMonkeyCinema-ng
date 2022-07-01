import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { employeesDelete } from "../../redux/actions/employeeActions";

const Employee = (props) => {
  const dispatch = useDispatch();

  const permissions = props.employee.permissions;

  const permissionsFinal = Object.keys(permissions)
    .filter((key) => permissions[key])
    .join(", ")
    .split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();

  const deleteEmployee = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(employeesDelete(props.employee._id));
    }
  };

  return (
    <Box display="flex" flexGrow={1} justifyContent="center">
      <Card sx={{ flexDirection: "column", flexGrow: 1, minHeight: "250px" }}>
        <CardHeader
          title={`${props.employee.firstName} ${props.employee.lastName}`}
        />
        <CardContent>
          <Typography className="employee">
            Username: {props.employee.username}{" "}
          </Typography>
          <Typography className="employee">
            Created at: {props.employee.createdAt.slice(0, 10)}
          </Typography>
          <Typography className="employee">
            Permissions: {permissionsFinal}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingBottom: 2 }}>
          <Button onClick={deleteEmployee}>Delete</Button>
          <Button component={Link} to={`../editEmployee/${props.employee._id}`}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Employee;
