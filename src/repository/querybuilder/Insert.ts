import { QueryBuilder } from "./QueryBuilder";

export interface IInsert {
  insert(table: string, dataClass: any): QueryBuilder;
}
