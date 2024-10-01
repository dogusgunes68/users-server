import { Request, Response } from "express";
import { IUser } from "../models/user";
import { IUserService, UserService } from "../service/user-service";
import { UserSearchQuery } from "./query";

export class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = new UserService();
    this.search = this.search.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.updateById = this.updateById.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const userReq: IUser = req.body;
    const user = await this.userService.create(userReq);
    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const { id } = req.params;

    const user = await this.userService.getById(parseInt(id));
    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  }

  async updateById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const { id } = req.params;
    const user: IUser = req.body;

    const updatedUser = await this.userService.updateById(parseInt(id), user);

    res.status(200).json({
      success: true,
      data: {
        user: updatedUser,
      },
    });
  }

  async search(
    req: Request<{}, {}, {}, UserSearchQuery>,
    res: Response
  ): Promise<void> {
    const { search, page, pageSize } = req.query;

    const results = await this.userService.search(search, page, pageSize);

    res.status(200).json({
      success: true,
      data: {
        results,
      },
    });
  }
}
