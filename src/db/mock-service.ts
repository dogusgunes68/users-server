import { Role, User } from "../models/user";
import { UserRepository } from "../repository/user-repository";
import data from "./mock";
export async function addMockData() {
  const userRepository = new UserRepository();

  const results = await userRepository.search();

  if (results.length === 0) {
    const users = data.map(
      (user) =>
        new User(
          user.name,
          user.surname,
          user.email,
          user.password,
          user.phone,
          user.age,
          user.country,
          user.district,
          user.user_role as Role
        )
    );

    users.map(async (user) => {
      await userRepository.create(user);

      console.log("Mock data added");
    });
  }
}
