const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

// get all employees
// GET /employees
// private, Admin only
const getAllEmployees = asyncHandler(async (req, res) => {
  if (req.employee.username === "Admin") {
    const allEmployees = await Employee.find();

    res.status(200).json(allEmployees);
  } else {
    res.status(403);
    throw new Error("Forbidden. Admin access only");
  }
});

// get current employee
// GET /employees/current
// private
const getCurrentEmployee = asyncHandler(async (req, res) => {
  res.status(200).json(req.employee);
});

// get employee by id
// GET /employees/:id
// private, Admin only
const getEmployeeById = asyncHandler(async (req, res) => {
  if (req.employee.username === "Admin") {
    const employee = await Employee.findById(req.params.id);

    res.status(200).json(employee);
  } else {
    res.status(403);
    throw new Error("Forbidden. Admin access only");
  }
});

// create new employee
// POST /employees
// private, Admin only
const addEmployee = asyncHandler(async (req, res) => {
  if (req.employee.username === "Admin") {
    const { firstName, lastName, username, password, permissions } = req.body;

    if (!firstName || !lastName || !username || !password || !permissions) {
      res.status(400);
      throw new Error("Please fill out all fields");
    }

    const employeeExists = await Employee.findOne({ username });
    if (employeeExists) {
      res.status(400);
      throw new Error("Employee already exists");
    }

    //// hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //// create employee
    const employee = await Employee.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      permissions,
    });

    if (employee) {
      res.status(201).json({
        _id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        username: employee.username,
        permissions: employee.permissions,
        token: generateToken(employee._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid employee data");
    }
  }
});

// edit employee
// PUT /employees/:id
// private, Admin only
const editEmployee = asyncHandler(async (req, res) => {
  if (req.employee.username === "Admin") {
    const employee = await Employee.findById(req.params.id);
    //// if no employee is found
    if (!employee) {
      res.status(400);
      throw new Error("Employee not found");
    }
    //// if employee is found but they have no former password
    //// OR former password is different from new password
    if (
      employee &&
      (!employee.password ||
        !(await bcrypt.compare(req.body.password, employee.password)))
    ) {
      //// hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //// update employee with hashed password
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        { ...req.body, password: hashedPassword },
        { new: true }
      );

      res.status(200).json(updatedEmployee);
    }

    //// if employee is found and password is identicle (unchanged)
    if (
      employee &&
      (await bcrypt.compare(req.body.password, employee.password))
    ) {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json(updatedEmployee);
    }
  } else {
    res.status(403);
    throw new Error("Forbidden. Admin access only");
  }
});

// delete employee
// DELETE /employees/:id
// private, Admin only
const deleteEmployee = asyncHandler(async (req, res) => {
  if (req.employee.username === "Admin") {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      res.status(400);
      throw new Error("Employee not found");
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403);
    throw new Error("Forbidden. Admin access only");
  }
});

// authenticate employee
// POST /employees/login
// public
const loginEmployee = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //// check for employee username
  const employee = await Employee.findOne({ username });

  if (employee && (await bcrypt.compare(password, employee.password))) {
    res.json({
      _id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      username: employee.username,
      permissions: employee.permissions,
      token: generateToken(employee._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || require("../config/keys").JWT_SECRET,
    { expiresIn: "9h" }
  );
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getCurrentEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee,
  loginEmployee,
};
