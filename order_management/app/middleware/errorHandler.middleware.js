exports.errorHandler = (error, req, res, next) => {
  error.statuscode = error.statuscode || 500;
  error.status = error.status || "Error";
  res.status(error.statuscode).json({
    Status: error.status,
    Message: error.message || error.Message || "Failed"
  });
};
