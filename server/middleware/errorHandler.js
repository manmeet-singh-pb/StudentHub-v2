const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;