const sendDevErr = (err, res) => {
  res.status(err.statusCode).json({
    statusText: err.statusText,
    error: err,
    name: err.name,
    stack: err.stack,
  });
};

const sendProdErr = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      statusText: err.statusText,
      message: err.message,
    });
  } else {
    res.status(500).json({
      statusText: "Internal server error",
      message: err.message,
    });
  }
};

const globalErr = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.statusText = err.statusText || "Internal server error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, res);
  } else {
    sendProdErr(err, res);
  }
};


export default globalErr