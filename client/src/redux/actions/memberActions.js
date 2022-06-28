import axios from "axios";
import { subscriptionsGetAll } from "./subscriptionActions";

const url =
  process.env.NODE_ENV === "production"
    ? "https://smc-services-dev.herokuapp.com/members"
    : "http://localhost:8000/members";

const membersGetAll = () => async (dispatch) => {
  const { data: members } = await axios.get(url);
  dispatch({ type: "MEMBERS_GET_ALL", payload: members });
};

const membersAddNew = (newMember) => async (dispatch) => {
  const { data: success } = await axios.post(url, newMember);
  await dispatch(membersGetAll());
  alert(success);
};

const membersEdit = (member) => async (dispatch) => {
  const { data: success } = await axios.put(`${url}/${member._id}`, member);
  await dispatch(membersGetAll());
  alert(success);
};

const membersEditSubscription = (memberId, movie) => async (dispatch) => {
  const { data: success } = await axios.post(`${url}/${memberId}`, movie);
  await dispatch(subscriptionsGetAll());
  alert(success);
};

// const membersDelete = (id) => async (dispatch) => {
//   const response = await axios.delete(`${url}/${id}`);
//   if (response.statusText === "OK") {
//     await dispatch(membersGetAll());
//     await dispatch(subscriptionsGetAll());
//     alert(response.data);
//   } else {
//     console.log(response);
//   }
// };

const membersDelete = (id) => async (dispatch) => {
  const { data: success } = await axios.delete(`${url}/${id}`);
  await dispatch(membersGetAll());
  await dispatch(subscriptionsGetAll());
  alert(success);
};

export {
  membersGetAll,
  membersAddNew,
  membersEdit,
  membersEditSubscription,
  membersDelete,
};
