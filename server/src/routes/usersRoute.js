const express = require("express");
const {
  getAllUsers,
  getUserByUseNmae,
  getUserById,
  getAllJobs,
  getUsersInRang,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/by-username/:username", getUserByUseNmae);
router.get("/by-id/:id", getUserById);
router.get("/jobs", getAllJobs);
router.get("/range", getUsersInRang);

module.exports = router;
