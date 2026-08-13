const notFound = (req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `No route matches ${req.method} ${req.originalUrl}`,
  });
};

export default notFound;