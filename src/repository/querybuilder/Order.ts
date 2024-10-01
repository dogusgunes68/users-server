import { QueryBuilder } from "./QueryBuilder";

export interface IOrder {
  orderBy(field: string, type: "ASC" | "DESC"): QueryBuilder;
}
