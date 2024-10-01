import { QueryBuilder } from "./QueryBuilder";

export interface ISelect {
  select(fields: string[]): QueryBuilder;
  from(table: string): QueryBuilder;
}
