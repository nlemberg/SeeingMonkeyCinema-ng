const express = require("express");
const {
  getAllEmployees,
  addEmployee,
  loginEmployee,
  getCurrentEmployee,
  getEmployeeById,
  editEmployee,
  deleteEmployee,
} = require("../utils/employeeUtils");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, getAllEmployees);
router.get("/:id", auth, getEmployeeById);
router.post("/", auth, addEmployee);
router.put("/:id", auth, editEmployee);
router.delete("/:id", auth, deleteEmployee);
router.post("/login", loginEmployee);
router.get("/current", auth, getCurrentEmployee);

module.exports = router;
