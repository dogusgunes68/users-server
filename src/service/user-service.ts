import { DuplicateResourceError } from "../errors/duplicate-resource-error";
import { NotFoundError } from "../errors/not-found-error";
import { IUser, User } from "../models/user";
import { IUserRepository, UserRepository } from "../repository/user-repository";

export interface IUserService {
  create(user: IUser): Promise<User>;
  updateById(id: number, user: IUser): Promise<User>;
  getById(id: number): Promise<User>;
  search(search?: string, page?: number, pageSize?: number): Promise<User[]>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(userReq: IUser): Promise<User> {
    await this.checkUserExistByEmail(userReq.email);
    const userEntity: User = new User(
      userReq.name,
      userReq.surname,
      userReq.email,
      userReq.password,
      userReq.phone,
      userReq.age,
      userReq.country,
      userReq.district,
      userReq.user_role
    );

    const createdUser: User | null = await this.userRepository.create(
      userEntity
    );

    if (createdUser === null) {
      throw new Error("User cannot be created");
    }

    return createdUser;
  }

  async updateById(id: number, userReq: IUser): Promise<User> {
    this.checkUserExistById(id);

    const userEntity: User = new User(
      userReq.name,
      userReq.surname,
      userReq.email,
      userReq.password,
      userReq.phone,
      userReq.age,
      userReq.country,
      userReq.district,
      userReq.user_role
    );

    userEntity.setUpdatedAt(new Date());

    const user: User | null = await this.userRepository.updateById(
      id,
      userEntity
    );

    if (user === null) {
      throw new Error("User cannot be updated");
    }

    return user;
  }

  async getById(id: number): Promise<User> {
    const userEntity = await this.userRepository.getById(id);
    if (userEntity === null) {
      throw new NotFoundError();
    }
    return userEntity;
  }

  async search(
    search: string,
    page: number,
    pageSize: number
  ): Promise<User[]> {
    const results: User[] = await this.userRepository.search(
      search,
      page,
      pageSize
    );

    return results;
  }

  private async checkUserExistByEmail(email: string): Promise<void> {
    const user = await this.userRepository.getByEmail(email);

    if (user !== null) {
      throw new DuplicateResourceError("User already exists");
    }
  }

  private checkUserExistById(id: number): void {
    const user = this.userRepository.getById(id);
    if (user === null) {
      throw new NotFoundError();
    }
  }
}
