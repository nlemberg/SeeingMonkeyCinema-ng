import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { Routes, Route, Link, useHistory } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useSelector } from "react-redux";
// import AddMember from "./addMember";
// import EditMember from "./editMember";

const Members = () => {
  // const history = useHistory()

  // let addMemberLink = null

  // if (!sessionStorage.getItem("employeePermissions").includes("viewSubscriptions")) {
  //     history.push("/home/access-denied")
  // }

  // if (sessionStorage.getItem("employeePermissions").includes("createSubscriptions")) {
  //     addMemberLink = <Button variant="text" component={Link} to={`${props.match.url}/addMember`} >Add Member</Button>
  // }
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.permissions.viewSubscriptions) {
      alert(
        "Oops. You don't have permission to view this page. Please contact your system Admin"
      );
      navigate("../welcomeHome");
    }
  }, [user, navigate]);

  return (
    <>
      <AppBar sx={{ marginBottom: 2 }} position="relative">
        <Toolbar>
          <PersonPinIcon className="appBarIcon" />
          <Button variant="text" component={Link} to="allMembers">
            All Members
          </Button>
          <Button
            variant="text"
            component={Link}
            to="./addMember"
            disabled={
              user.username === "Guest" || user.permissions.createSubscriptions
                ? false
                : true
            }
          >
            Add Member
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Members;
