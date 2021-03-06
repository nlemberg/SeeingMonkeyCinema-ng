import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, AppBar, Toolbar } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useSelector } from "react-redux";

const Members = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.permissions.viewSubscriptions) {
      navigate("../accessDenied");
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
