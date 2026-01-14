const express = require("express");
const {
  getAllEmployees,
  getEmployeeByID,
  createEmployee,
  updateEmployss,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/:/id", getEmployeeByID);
router.post("/".createEmployee);
router.put("/:id", updateEmployss);
router.delete("/:id", deleteEmployee);

module.exports = router;
