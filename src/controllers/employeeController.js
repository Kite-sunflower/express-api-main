/* eslint-disable consistent-return */
const db = require("../db/connection");
const schema = require("../db/schema");
const employees = db.get("employees");

/* Get all employees */

exports.getAllEmployees = async (req, res, next) => {
  try {
    const allEmployees = await employees.find({});
    res.json({
      allEmployees,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

/* Get a specific employee */
exports.getEmpolyeeById = async (req, res, next) => {
  try {
    const employee = await employees.findOne({ _id: req.params.id });
    if (!employee) return next(new Error("Employee does not exist"));
    res.json({ employee, requestTime: req.requestTime });
  } catch (error) {
    next(error);
  }
};

/* Create a new employee */
exports.createEmployee = async (req, res, next) => {
  try {
    const { name, job } = req.body;
    await schema.validateAsync({ name, job });

    const existing = await employees.findOne({ name });
    if (existing) {
      res.status(409);
      return next(new Error("Employee already exists"));
    }

    const newEmployee = await employees.insert({ name, job });
    res.status(201).json({ newEmployee, requestTime: req.requestTime });
  } catch (error) {
    next(error);
  }
};

/* Update a specific employee */
exports.updateEmployee = async (req, res, next) => {
  try {
    const { name, job } = req.body;
    const result = await schema.validateAsync({ name, job });

    const employee = await employees.findOne({ _id: req.params.id });
    if (!employee) return next();

    const updated = await employees.update(
      { _id: req.params.id },
      { $set: result },
      { upsert: true }
    );

    res.json({ updated, requestTime: req.requestTime });
  } catch (error) {
    next(error);
  }
};

/* Delete a specific employee */
// /655afa8196943302b03283bd
exports.deleteEmployees = async (req, res, next) => {
  try {
    const employee = await employees.findOne({ _id: req.params.id });
    if (!employee) return next();

    await employees.remove({ _id: req.params.id });
    res.json({
      message: "Employee has been deleted",
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};
