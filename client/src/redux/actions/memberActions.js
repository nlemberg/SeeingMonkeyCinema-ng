import axios from "axios";
import { subscriptionsGetAll } from "./subscriptionActions";

const url =
  process.env.NODE_ENV === "production"
    ? "https://smc-services-dev.herokuapp.com/members"
    : // ?  "https://attractive-ring-tuna.cyclic.app/members"
      "http://localhost:8000/members";

const membersGetAll = () => async (dispatch) => {
  const { data: members } = await axios.get(url);
  dispatch({ type: "MEMBERS_GET_ALL", payload: members });
};

const membersAddNew = (newMember) => async (dispatch) => {
  const response = await axios.post(url, newMember);
  await dispatch(membersGetAll());
  if (response.status === 200) {
    alert("Member added");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const membersEdit = (member) => async (dispatch) => {
  const response = await axios.put(`${url}/${member._id}`, member);
  await dispatch(membersGetAll());
  if (response.status === 200) {
    alert("Member updated");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const membersEditSubscription = (memberId, movie) => async (dispatch) => {
  const response = await axios.post(`${url}/${memberId}`, movie);
  await dispatch(subscriptionsGetAll());
  if (response.status === 200) {
    alert("Subscription updated");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const membersDelete = (id) => async (dispatch) => {
  const response = await axios.delete(`${url}/${id}`);
  await dispatch(membersGetAll());
  await dispatch(subscriptionsGetAll());
  if (response.status === 200) {
    alert("Member deleted");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

export {
  membersGetAll,
  membersAddNew,
  membersEdit,
  membersEditSubscription,
  membersDelete,
};
