const handleCastErrorDB = (err, res) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  res.status(400).json({
    status: "fail",
    message,
  });
};
const handleDuplicateFieldsBD = (err, res) => {
  const errorFieldInfo = Object.entries(err.keyValue)[0];
  res.status(400).json({
    status: "fail",
    message: `${errorFieldInfo[0]} must be unique. ${errorFieldInfo[1]} is already taken.`,
  });
};
const handleValidationErrorDB = (err, res) => {
  res.status(400).json({
    status: "fail",
    message: err._message,
  });
};

//error handler itself

function errorHandler(err, req, res, next) {
  if (err.name === "CastError") return handleCastErrorDB(err, res);
  if (err.code === 11000) return handleDuplicateFieldsBD(err, res);
  if (err._message) {
    if (err._message.includes("validation"))
      return handleValidationErrorDB(err, res);
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
}

module.exports = errorHandler;
