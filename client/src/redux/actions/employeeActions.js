import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://smc-services-dev.herokuapp.com/employees"
    : "http://localhost:8000/employees";

const employeesGetAll = () => async (dispatch, getState) => {
  const { token } = getState().auth.user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: employees } = await axios.get(url, config);
  dispatch({ type: "EMPLOYEES_GET_ALL", payload: employees });
};

const employeesAddNew = (newEmployee) => async (dispatch, getState) => {
  const { token } = getState().auth.user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: success } = await axios.post(url, newEmployee, config);
  await dispatch(employeesGetAll());
  alert(success);
};

const employeesEdit = (employee) => async (dispatch, getState) => {
  const { token } = getState().auth.user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: success } = await axios.put(
    `${url}/${employee._id}`,
    employee,
    config
  );
  await dispatch(employeesGetAll());
  console.log(success);
  alert(JSON.stringify(success));
};

const employeesDelete = (id) => async (dispatch, getState) => {
  const { token } = getState().auth.user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: success } = await axios.delete(`${url}/${id}`, config);
  await dispatch(employeesGetAll());
  alert(success);
};

export { employeesGetAll, employeesAddNew, employeesEdit, employeesDelete };
