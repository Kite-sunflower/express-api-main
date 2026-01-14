const requestTime = (req, res, next) => {
  const arrivalTime = new Date().toISOString();
  req.requestTime = arrivalTime;
  res.setHeader("X-Request-Time", arrivalTime);
  next();
};
module.exports = requestTime;
