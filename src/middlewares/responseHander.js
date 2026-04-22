const requestTime = require('./requestTime');

module.exports = (req, res, next) => {
  res.sendError = (statusCode, message) => {
    return res.status(statusCode).json({
      status: 'fail',
      message,
      requestTime: req.requestTime,
    });
  };
  res.sendSuccess = (statusCode, data, message) => {
    return res.status(statusCode).json({
      status: 'success',
      data,
      message,
      requestTime: req.requestTime,
    });
  };
  next();
};
