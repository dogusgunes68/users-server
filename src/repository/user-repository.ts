import { User } from "../models/user";
import { IQueryBuilder, QueryBuilder } from "./querybuilder/QueryBuilder";
import { database } from "../db/database";

export interface IUserRepository {
  create(user: User): Promise<User | null>;
  updateById(id: number, user: User): Promise<User | null>;
  getById(id: number): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  search(search: string, page: number, pageSize: number): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  private queryBuilder: IQueryBuilder;
  private tableName: string = "users";
  constructor() {
    this.queryBuilder = new QueryBuilder();
  }

  async create(user: User): Promise<User | null> {
    const { query, params } = this.queryBuilder
      .insert(this.tableName, user)
      .returning()
      .build();
    const result = await database.query<User>(query, params);
    return result.rows.length === 0 ? null : result.rows[0];
  }

  async updateById(id: number, user: User): Promise<User | null> {
    const { query, params } = this.queryBuilder
      .update(this.tableName, user, { condition: "id=$1", param: id })
      .returning()
      .build();
    console.log("query: " + query);

    const result = await database.query<User>(query, params);
    return result.rows.length === 0 ? null : result.rows[0];
  }

  async getById(id: number): Promise<User | null> {
    const { query, params } = this.queryBuilder
      .select([])
      .from(this.tableName)
      .where("id=$1", id)
      .build();
    const result = await database.query<User>(query, params);
    return result.rows.length === 0 ? null : result.rows[0];
  }

  async getByEmail(email: string): Promise<User | null> {
    const { query, params } = this.queryBuilder
      .select([])
      .from(this.tableName)
      .where("email=$1", email)
      .build();
    const result = await database.query<User>(query, params);
    return result.rows.length === 0 ? null : result.rows[0];
  }

  async search(
    search: string = "",
    page: number = 0,
    pageSize: number = 10
  ): Promise<User[]> {
    const fields: string[] = ["name", "surname"];
    const { query, params } = this.queryBuilder
      .select([])
      .from(this.tableName)
      .search({
        fields: [...fields],
        value: `%${search}%`,
      })
      .orderBy("id")
      .pagination(page, pageSize)
      .build();

    console.log("query: " + query);
    console.log("param: " + params.map((param) => `param: ${param}`));

    const result = await database.query<User>(query, params);
    return result.rows;
  }
}
