// const { createLogger, transports } = require("winston");
// const { AppError, ValidationError } = require("./app-error");

// const LogError = createLogger({
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: "app_error.log" }),
//   ],
// });
// class ErrorLogger {
//   constructor() {}
//   async logError(err) {
//     console.log("==================== Start Error Logger ===============");

//     // ✅ Log validation errors differently
//     if (err instanceof ValidationError) {
//       LogError.log({
//         level: "warn",
//         message: `VALIDATION ERROR: ${new Date()} - ${err.message}`,
//       });
//     } else {
//       LogError.log({
//         level: "error",
//         message: `ERROR: ${new Date()} - ${JSON.stringify(err)}`,
//       });
//     }

//     console.log("==================== End Error Logger ===============");
//     return false;
//   }
//   isTrustError(error) {
//     if (error instanceof AppError) {
//       return error.isOperational;
//     } else {
//       return false;
//     }
//   }
// }

// const ErrorHandler = async (err, req, res, next) => {
//   const errorLogger = new ErrorLogger();
//   await errorLogger.logError(err);
//   process.on("uncaughtException", (reason, promise) => {
//     console.log(reason, "unhandled");
//     throw reason;
//   });
//   process.on("uncaughtException", (error) => {
//     errorLogger.logError(error);
//     if (errorLogger.isTrustError(err)) {
//       process.exit(0); //need to restart
//     }
//     // console.log(err.description, "-------> DESCRIPTION");
//     // console.log(err.message, "-------> MESSAGE");
//     // console.log(err.name, "-------> NAME");
//   });
//   if (err instanceof ValidationError) {
//     return res.status(err.statuscode).json({
//       error: {
//         type: "ValidationError",
//         message: err.message,
//         status: err.statuscode,
//       },
//     });
//   }

//   if (errorLogger.isTrustError(err)) {
//     if (err.errorStack) {
//       const errDescription = err.errorStack;
//       return res.status(err.statusCode).json({ message: errDescription });
//     }
//     return res.status(err.statuscode || 500).json({
//       error: {
//         message: err.message || "Internal Server Error",
//         status: err.statuscode || 500,
//       },
//     });
//   } else {
//     //process exit // terriablly wrong with flow need restart
//   }
//   return res.status(err.statuscode || 500).json({
//     error: {
//       message: err.message || "Internal Server Error",
//       status: err.statuscode || 500,
//     },
//   });
//   next();
// };

const { createLogger, transports, format } = require("winston");
const { AppError, ValidationError } = require("./app-error");

const LogError = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app_error.log" }),
  ],
});

class ErrorLogger {
  async logError(err) {
    console.log("==================== Start Error Logger ===============");

    // ✅ Log validation errors differently
    if (err instanceof ValidationError) {
      LogError.log({
        level: "warn",
        message: `VALIDATION ERROR: ${new Date()} - ${err.message}`,
      });
    } else {
      LogError.log({
        level: "error",
        message: `ERROR: ${new Date()} - ${JSON.stringify(err)}`,
      });
    }

    console.log("==================== End Error Logger ===============");
    return false;
  }

  isTrustError(error) {
    return error instanceof AppError && error.isOperational;
  }
}

module.exports = ErrorLogger;

const ErrorHandler = async (err, req, res, next) => {
  const errorLogger = new ErrorLogger();

  // ✅ Log error before sending response
  await errorLogger.logError(err);

  if (err instanceof ValidationError) {
    return res.status(err.statuscode).json({
      error: {
        type: "ValidationError",
        message: err.message,
        status: err.statuscode,
      },
    });
  }

  return res.status(err.statuscode || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.statuscode || 500,
    },
  });
};

module.exports = ErrorHandler;
