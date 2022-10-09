const errorhandling = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.resultvalue([], "Authentication failed", 1);
  }
  res.resultvalue([], err, 1);
};

module.exports = {
  errorhandling,
};
