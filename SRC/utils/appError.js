export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.statusText = `${statusCode}`.startsWith("4")
      ? "fail"
      : "Internal server error";
    this.isOperational = true;
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}
