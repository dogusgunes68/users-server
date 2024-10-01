import { QueryBuilder } from "./QueryBuilder";

export interface IDelete {
  delete(
    table: string,
    options: { condition: string; param: any }
  ): QueryBuilder;

  deleteAll(table: string): QueryBuilder;
}
