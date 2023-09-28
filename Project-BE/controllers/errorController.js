module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// module.exports = (err, req, res, next) => {
//   // Set a default status code and status message if they are not provided
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   // Create a response JSON object with the error details
//   const errorResponse = {
//     status: err.status,
//     message: err.message,
//     // You can choose to include or exclude the stack trace based on your needs
//     // stack: err.stack,
//   };

//   // Send the error response to the client with the appropriate status code
//   res.status(err.statusCode).json(errorResponse);
//   next();
// };
