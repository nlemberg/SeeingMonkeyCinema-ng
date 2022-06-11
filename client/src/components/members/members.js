import React from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { Routes, Route, Link, useHistory } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AllMembers from "./allMembers";
// import AddMember from "./addMember";
// import EditMember from "./editMember";
import Member from "./member";

const Members = (props) => {
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
      <AllMembers />
      <Routes>
        <Route path="allMembers" element={<AllMembers />} />
        {/* <Route path="addMember" element={<AddMember/>} /> */}
        {/* <Route path="editMember/:id" element={<EditMember/>} /> */}
        <Route path="allMembers/:id" element={<Member />} />
      </Routes>
    </>
  );
};

export default Members;
