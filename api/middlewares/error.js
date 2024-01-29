const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
  });
};

export default errorHandlerMiddleware;
