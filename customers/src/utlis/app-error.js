const STATUS_CODE = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class AppError extends Error {
  constructor(
    name,
    statuscode,
    description,
    isOperational,
    errorStack,
    loginErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, AppError.prototype);
    this.name = name;
    this.statuscode = statuscode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loginErrorResponse;
    Error.captureStackTrace(this, this.constructor);
  }
}
//api specific error

class APIError extends AppError {
  constructor(
    name,
    statuscode = STATUS_CODE.INTERNAL_ERROR,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statuscode, description, isOperational);
  }
}

//400
class BadRequestError extends AppError {
  constructor(description = "Bad Request", loginErrorResponse) {
    super(
      "NOT FOUND",
      STATUS_CODE.BAD_REQUEST,
      description,
      true,
      false,
      loginErrorResponse
    );
  }
}

class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack) {
    super(
      "VALIDATION ERROR",
      STATUS_CODE.BAD_REQUEST,
      description,
      true,
      errorStack
    );
  }
}
class JsonWebTokenError extends AppError {
  constructor(description = "Not Authorized User", errorStack) {
    super(
      "UN_AUTHORIZED",
      STATUS_CODE.UN_AUTHORIZED,
      description,
      true,
      errorStack
    );
  }
}
module.exports = {
  AppError,
  APIError,
  BadRequestError,
  ValidationError,
  STATUS_CODE,
  JsonWebTokenError,
};
