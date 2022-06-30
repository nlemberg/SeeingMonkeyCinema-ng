import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { employeesAddNew } from "../../redux/actions/employeeActions";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const history = useHistory();

  //   if (sessionStorage.getItem("employee") !== "Admin") {
  //     history.push("/home/access-denied");
  //   }

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    permissions: {},
  });

  const [tempPermissions, setTempPermissions] = useState({
    viewSubscriptions: false,
    createSubscriptions: false,
    updateSubscriptions: false,
    deleteSubscriptions: false,
    viewMovies: false,
    createMovies: false,
    updateMovies: false,
    deleteMovies: false,
  });

  // const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newEmployee.firstName ||
      !newEmployee.lastName ||
      !newEmployee.username
    ) {
      alert("All Fields are required. Please fill out the form");
    } else if (!Object.values(tempPermissions).includes(true)) {
      alert("Employee must have at least one permission");
    } else {
      const employee = {
        ...newEmployee,
        permissions: tempPermissions,
      };
      await dispatch(employeesAddNew(employee));
      navigate("../allEmployees");
    }
  };

  // useEffect(() => {
  //     async function createNew() {
  //         if (isValid) {
  //             const newCombinedEmployee = await createCombinedEmployee(newEmployee, tempPermissions)
  //             await dispatch(employeeLoginsAddNew(newCombinedEmployee))
  //             history.push("/home/employees/allEmployees")
  //         }
  //     }
  // createNew()
  // }, [isValid])

  return (
    <Box display="flex" justifyContent="center">
      <Card className="addOrEdit">
        <CardHeader title="Add New Employee" />
        <CardContent component="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <TextField
              label="First Name"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, firstName: e.target.value })
              }
              type="text"
              name="firstName"
              value={newEmployee.firstName}
            />
            <TextField
              label="Last Name"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, lastName: e.target.value })
              }
              type="text"
              name="lastName"
              value={newEmployee.lastName}
            />
            <TextField
              label="User Name"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, username: e.target.value })
              }
              type="text"
              name="username"
              value={newEmployee.username}
            />
            <TextField
              label="Password"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
              type="password"
              name="password"
              value={newEmployee.password}
            />
          </Box>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            textAlign="center"
            paddingTop={1}
          >
            Permissions:
          </Typography>
          <Box display="flex" flexDirection="row" flexGrow={1} padding={1}>
            <Box
              display="flex"
              flexDirection="column"
              flexGrow={1}
              width="fit-content"
            >
              <FormControlLabel
                label="View Movies"
                control={
                  <Checkbox
                    name="viewMovies"
                    checked={tempPermissions.viewMovies}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        viewMovies: e.target.checked
                          ? e.target.checked
                          : tempPermissions.createMovies ||
                            tempPermissions.updateMovies ||
                            tempPermissions.deleteMovies
                          ? !e.target.checked
                          : e.target.checked,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Create Movies"
                control={
                  <Checkbox
                    name="createMovies"
                    checked={tempPermissions.createMovies}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        createMovies: e.target.checked,
                        viewMovies: true,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Update Movies"
                control={
                  <Checkbox
                    name="updateMovies"
                    checked={tempPermissions.updateMovies}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        updateMovies: e.target.checked,
                        viewMovies: true,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Delete Movies"
                control={
                  <Checkbox
                    name="deleteMovies"
                    checked={tempPermissions.deleteMovies}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        deleteMovies: e.target.checked,
                        viewMovies: true,
                      })
                    }
                  />
                }
              />
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ marginRight: 2 }}
            />
            <Box
              display="flex"
              flexDirection="column"
              flexGrow={1}
              width="fit-content"
            >
              <FormControlLabel
                label="View subscriptions"
                control={
                  <Checkbox
                    title="viewSubscriptions"
                    checked={tempPermissions.viewSubscriptions}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        viewSubscriptions: e.target.checked
                          ? e.target.checked
                          : tempPermissions.createSubscriptions ||
                            tempPermissions.updateSubscriptions ||
                            tempPermissions.deleteSubscriptions
                          ? !e.target.checked
                          : e.target.checked,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Create subscriptions"
                control={
                  <Checkbox
                    name="createSubscriptions"
                    checked={tempPermissions.createSubscriptions}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        createSubscriptions: e.target.checked,
                        viewSubscriptions: true,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Update subscriptions"
                control={
                  <Checkbox
                    name="updateSubscriptions"
                    checked={tempPermissions.updateSubscriptions}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        updateSubscriptions: e.target.checked,
                        viewSubscriptions: true,
                      })
                    }
                  />
                }
              />
              <FormControlLabel
                label="Delete subscriptions"
                control={
                  <Checkbox
                    name="deleteSubscriptions"
                    checked={tempPermissions.deleteSubscriptions}
                    onChange={(e) =>
                      setTempPermissions({
                        ...tempPermissions,
                        deleteSubscriptions: e.target.checked,
                        viewSubscriptions: true,
                      })
                    }
                  />
                }
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" padding={2}>
            <Button component={Link} to="../allEmployees">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddEmployee;
