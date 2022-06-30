import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  // const navigate = useNavigate();
  //   const { firstName, lastName, username, id } = props.employee
  //     ? props.employee
  //     : "";
  //   const permissions = props.employee ? props.employee.permissions : {};
  //   const createdAt = props.employee
  //     ? props.employee.createdAt
  //     : "1970-01-01T00:00:00Z";
  const permissions = props.employee.permissions;

  const permissionsFinal = Object.keys(permissions)
    .filter((key) => permissions[key])
    .join(", ")
    .split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();

  const deleteEmployee = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      //   dispatch(employeesDelete(id));
      dispatch(employeesDelete(props.employee._id));
    }
  };

  return (
    <Box display="flex" flexGrow={1} justifyContent="center">
      <Card sx={{ flexDirection: "column", flexGrow: 1, minHeight: "250px" }}>
        <CardHeader
          //   title={`${firstName} ${lastName}`}
          title={`${props.employee.firstName} ${props.employee.lastName}`}
        />
        <CardContent>
          {/* <Typography> */}
          <Typography className="employee">
            {" "}
            Username: {props.employee.username}{" "}
          </Typography>
          {/* <Typography className="employee"> Username: {username} </Typography> */}
          {/* {props.employee.username} */}
          {/* </Typography> */}
          {/* <Typography> */}
          <Typography className="employee">
            Created at: {props.employee.createdAt.slice(0, 10)}
            {/* Created at: {createdAt.slice(0, 10)}{" "} */}
          </Typography>
          {/* {createdAt.slice(0, 10)} */}
          {/* {props.employee.createdAt.slice(0, 10)} */}
          {/* </Typography> */}
          {/* <Typography> */}
          <Typography className="employee">
            Permissions: {permissionsFinal}
          </Typography>
          {/* {permissionsFinal} */}
          {/* </Typography> */}
        </CardContent>
        <CardActions sx={{ paddingBottom: 2 }}>
          <Button onClick={deleteEmployee}>Delete</Button>
          {/* <Button component={Link} to={`../editEmployee/${id}`}> */}
          <Button component={Link} to={`../editEmployee/${props.employee._id}`}>
            Edit
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Employee;
