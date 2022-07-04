import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { membersAddNew } from "../../redux/actions/memberActions";

const AddMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    address: { city: "" },
  });

  const { name, email, address } = newMember;

  useEffect(() => {
    if (!user.permissions.createSubscriptions && !user.username === "Guest") {
      alert(
        "Oops. You don't have permission to view this page. Please contact your system Admin"
      );
      navigate("../allMembers");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = {
      name,
      email,
      address,
    };
    await dispatch(membersAddNew(memberData));
    navigate("../allMembers");
  };

  return (
    <Box display="flex" justifyContent="center">
      <Card className="addOrEdit">
        <CardHeader title="Add New Member" />
        <CardContent component="form" onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <TextField
              label="Name"
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              type="email"
            />
            <TextField
              label="City"
              onChange={(e) =>
                setNewMember({
                  ...newMember,
                  address: { city: e.target.value },
                })
              }
            />
          </Box>
          <Box display="flex" justifyContent="center" padding={2}>
            <Button component={Link} to="../allMembers">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={user.permissions.createSubscriptions ? false : true}
            >
              Save
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddMember;
