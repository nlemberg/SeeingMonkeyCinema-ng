import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { membersDelete } from "../../redux/actions/memberActions";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  //   List,
  Typography,
} from "@mui/material";
import MoviesWatched from "./moviesWatched";

const Member = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const members = useSelector((state) => state.members);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  let memberId;
  let member;
  let navLink;

  // let deleteButton = null;
  // let editButton = null;

  if (id) {
    memberId = id;
    member = members.find((member) => member._id === id);
    navLink = "../allMembers";
  } else if (props.member) {
    member = props.member;
    memberId = props.member._id;
    navLink = ".";
  }

  const deleteMember = () => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      dispatch(membersDelete(memberId));
      navigate(navLink);
    }
  };

  // if (sessionStorage.getItem("employeePermissions").includes("deleteSubscriptions")) {
  //     deleteButton = <Button onClick={deleteMember}>Delete</Button>
  // }

  // if (sessionStorage.getItem("employeePermissions").includes("updateSubscriptions")) {
  //     editButton = <Button component={Link} to={`/home/subscriptions/editMember/${memberId}`} >Edit</Button>
  // }

  return (
    <Box display="flex" flexGrow={1} justifyContent="center">
      <Card
        sx={{
          flexGrow: 1,
          maxWidth: "sm",
          flexDirection: "column",
          maxHeight: 450,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            justifyContent: "space-between",
          }}
        >
          <CardActionArea component={Link} to={`../${memberId}`}>
            <CardHeader
              avatar={
                <Avatar
                  alt={member.name}
                  src={`https://source.unsplash.com/random/?face&${
                    member.name.split(" ")[0]
                  }`}
                />
              }
              title={<Typography variant="h6">{member.name}</Typography>}
              sx={{ alignItems: "flex-start" }}
            />
          </CardActionArea>
          <CardContent>
            <Typography variant="subtitle1"> Email: {member.email}</Typography>
            <Typography variant="subtitle1">
              {" "}
              City: {member.address.city}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={deleteMember}
              disabled={user.permissions.deleteSubscriptions ? false : true}
            >
              Delete
            </Button>
            <Button
              component={Link}
              to={`../editMember/${memberId}`}
              disabled={
                user.username === "Guest" ||
                user.permissions.updateSubscriptions
                  ? false
                  : true
              }
            >
              Edit
            </Button>
          </CardActions>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "45%",
            overflow: "overlay",
          }}
        >
          <CardContent sx={{ paddingTop: 0 }}>
            <MoviesWatched memberId={memberId} />
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default Member;
