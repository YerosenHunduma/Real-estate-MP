const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  console.log(message, statusCode);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorHandlerMiddleware;
