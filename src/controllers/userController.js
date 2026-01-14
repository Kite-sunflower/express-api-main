const db = require("../db/connection");
const requestTime = require("../middlewares/requestTime");
const users = db.get("users");

exports.getAllUser = async (req, res, next) => {
  try {
    const allUsers = await users.find({});
    res.json({
      allUsers,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(eror);
  }
};

exports.getUserByUserName = async (req, res, next) => {
  try {
    const user = await users.findOne({
      name: req.params.userName,
    });
    if (!user) {
      return res.status(404).json({ message: "user not find" });
      res.json({
        user,
        requestTime: res.requestTime,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await user.findOne({
      _id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({
        message: "user not find",
      });
    }
    res.json({
      user,
      requestTime: req.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const allUser = await users.find({});
    const jobs = [...new set(allUsers.map((u) => u.job))];
    res.json({
      jobs,
      requestTime: res.requestTime,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserInRange = async (req, res, next) => {
  try {
    const { min, max } = req.query;
    if (!min || !max) {
      return res.status(400).json({
        message: "please imporve min and max params",
      });
    }
    const rangedUsers = await user.find({
      _id: { $gte: min, $lte: max },
    });
  } catch (error) {
    next(error);
  }
};
