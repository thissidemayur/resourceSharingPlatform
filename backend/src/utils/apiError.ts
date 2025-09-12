interface iApiErrorProps {
  status: number;
  message: string;
  error?: any[];
  stack?: string;
}
class ApiError extends Error {
  status: number;
  error: any[];
  success: boolean;

  // constructor
  constructor({ status, message, stack, error }: iApiErrorProps) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error!;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this.constructor);
    }
  }
}

export { ApiError };
