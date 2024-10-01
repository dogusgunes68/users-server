import { AuditableModel } from "./base-model";
import { hashPassword } from "../utils/password";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  country: string;
  district: string;
  user_role: Role;
}

export class User extends AuditableModel {
  constructor(
    private name: string,
    private surname: string,
    private email: string,
    private password: string,
    private phone: string,
    private age: number,
    private country: string,
    private district: string,
    private user_role: Role
  ) {
    super();
    this.password = hashPassword(this.password);
  }
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
