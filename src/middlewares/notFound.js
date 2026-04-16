module.exports = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `页面不存在：${req.originalUrl}`,
  });
};
