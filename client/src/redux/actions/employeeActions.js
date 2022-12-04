import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://seeing-monkey-cinema.onrender.com/employees"
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
  const response = await axios.post(url, newEmployee, config);
  await dispatch(employeesGetAll());
  if (response.status === 200) {
    alert("Employee Added");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const employeesEdit = (employee) => async (dispatch, getState) => {
  const { token } = getState().auth.user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${url}/${employee._id}`, employee, config);
  await dispatch(employeesGetAll());
  if (response.status === 200) {
    alert("Employee updated");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

const employeesDelete = (id) => async (dispatch, getState) => {
  const { token } = getState().auth.user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${url}/${id}`, config);
  await dispatch(employeesGetAll());
  if (response.status === 200) {
    alert("Employee deleted");
  } else {
    alert(JSON.stringify(response.statusText));
  }
};

export { employeesGetAll, employeesAddNew, employeesEdit, employeesDelete };
