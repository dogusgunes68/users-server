import { QueryBuilder } from "./QueryBuilder";

export interface IPagination {
  pagination(page: number, pageSize: number): QueryBuilder;
}
