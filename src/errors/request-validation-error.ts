import { ValidationError } from "joi";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super("Bad request");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((err) => {
      if (err.isJoi) {
        return { message: err.message, field: err.name };
      }

      return { message: err.message };
    });
  }
}
