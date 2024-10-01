import bcrypt from "bcrypt";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(hash: string, password: string): boolean {
  return bcrypt.compareSync(password, hash);
}
