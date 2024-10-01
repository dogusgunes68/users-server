import { QueryBuilder } from "./QueryBuilder";

export interface IUpdate {
  update(
    table: string,
    field: any,
    options: { condition: string; param: any }
  ): QueryBuilder;

  updateAll(table: string, field: string, value: any): QueryBuilder;
}
