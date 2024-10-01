import joi from "joi";
import { Role } from "../models/user";

export const userCreateValidation = joi.object({
  name: joi.string().trim().required().min(2).max(100),
  surname: joi.string().trim().required().min(2).max(100),
  email: joi.string().required().email(),
  password: joi.string().trim().min(8).max(100).required(),
  phone: joi.string().trim().min(11).max(11).required(),
  age: joi.number().positive(),
  country: joi.string().trim().min(2).max(100).required(),
  district: joi.string().trim().min(2).max(100).required(),
  user_role: joi
    .string()
    .valid(...Object.values(Role))
    .trim()
    .min(2)
    .max(50)
    .required(),
});

export const userUpdateValidation = joi.object({
  name: joi.string().trim().required().min(2).max(100),
  surname: joi.string().trim().required().min(2).max(100),
  email: joi.string().required().email(),
  password: joi.string().trim().min(8).max(100).required(),
  phone: joi.string().trim().min(11).max(11).required(),
  age: joi.number().positive(),
  country: joi.string().trim().min(2).max(100).required(),
  district: joi.string().trim().min(2).max(100).required(),
  user_role: joi
    .string()
    .valid(...Object.values(Role))
    .trim()
    .min(2)
    .max(50)
    .required(),
});
