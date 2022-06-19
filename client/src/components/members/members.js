import React from "react";
import { Link, Outlet } from "react-router-dom";
// import { Routes, Route, Link, useHistory } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
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

  return (
    <>
      <AppBar sx={{ marginBottom: 2 }} position="relative">
        <Toolbar>
          <PersonPinIcon className="appBarIcon" />
          <Button variant="text" component={Link} to="allMembers">
            All Members
          </Button>
          {/* {addMemberLink} */}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Members;
