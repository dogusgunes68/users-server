import { Request, Response, NextFunction, response } from "express";
import Joi from "joi";
import { RequestValidationError } from "../errors/request-validation-error";

export function validateBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new RequestValidationError([error]);
    }
    req.body = value;
    next();
  };
}
