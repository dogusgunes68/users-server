import { IDelete } from "./Delete";
import { IInsert } from "./Insert";
import { IOrder } from "./Order";
import { IPagination } from "./Pagination";
import { ISearch } from "./Search";
import { ISelect } from "./Select";
import { IUpdate } from "./Update";
import { IWhere } from "./Where";

export interface IQueryBuilder
  extends ISelect,
    IWhere,
    IOrder,
    IInsert,
    IUpdate,
    IDelete,
    IPagination,
    ISearch {}

export class QueryBuilder implements IQueryBuilder {
  private query: string;
  private params: any[];

  constructor() {
    this.query = "";
    this.params = [];
  }

  select(fields: string[]): this {
    if (fields.length === 0) {
      this.query = `SELECT *`;
    } else {
      this.query = `SELECT ${fields.join(", ")}`;
    }

    return this;
  }

  from(table: string): this {
    this.query += ` FROM ${table}`;
    return this;
  }

  pagination(page: number, pageSize: number): this {
    this.query += ` LIMIT ${pageSize} OFFSET ${page}`;
    return this;
  }

  search(data: { fields: string[]; value: string }): this {
    if (this.query.includes("WHERE")) {
      data.fields.forEach((field, index) => {
        this.query += ` OR ${field} ILIKE $${index + 1}`;
        this.params.push(data.value);
      });
    } else {
      data.fields.forEach((field, index) => {
        index === 0
          ? (this.query += ` WHERE ${field} ILIKE $${index + 1}`)
          : (this.query += ` OR ${field} ILIKE $${index + 1}`);
        this.params.push(data.value);
      });
    }
    return this;
  }

  where(fieldCondition: string, param: any): this {
    if (this.query.includes("WHERE")) {
      this.query += ` AND ${fieldCondition}`;
    } else {
      this.query += ` WHERE ${fieldCondition}`;
    }
    this.params.push(param);
    return this;
  }

  orderBy(field: string, type = "ASC"): this {
    this.query += ` ORDER BY ${field} ${type}`;
    return this;
  }

  insert(table: string, dataClass: any): this {
    const fields = Object.keys(dataClass).filter((field) => field !== "id");
    const conditions = fields.map((_, index) => `$${index + 1}`).join(", ");
    this.query = `INSERT INTO ${table} (${fields.join(
      ", "
    )}) VALUES (${conditions})`;
    this.params = fields.map((field) => dataClass[field]);
    return this;
  }

  updateAll(table: string, field: string, value: any): this {
    this.query = `UPDATE ${table} SET ${field} = ${value}`;
    return this;
  }

  update(
    table: string,
    data: any,
    options: { condition: string; param: any }
  ): this {
    const fields = Object.entries(data)
      .filter(
        (field) =>
          field[0] !== "id" &&
          field[0] !== "created_at" &&
          field[0] !== "updated_at"
      )
      .map((field) => {
        return `${field[0]} = ${
          typeof field[1] === "string" ? "'" + `${field[1]}` + "'" : field[1]
        }`;
      });
    this.query = `UPDATE ${table} SET ${fields.join(", ")} WHERE ${
      options.condition
    }`;
    this.params.push(options.param);
    return this;
  }

  deleteAll(table: string): this {
    this.query = `DELETE FROM ${table}`;
    return this;
  }

  delete(table: string, options: { condition: string; param: any }): this {
    this.query = `DELETE FROM ${table} WHERE ${options.condition}`;
    this.params.push(options.param);
    return this;
  }

  returning() {
    this.query += " RETURNING *";
    return this;
  }

  build(): { query: string; params: any[] } {
    const qb = { query: this.query + ";", params: this.params };
    this.params = [];
    this.query = "";
    return qb;
  }
}
