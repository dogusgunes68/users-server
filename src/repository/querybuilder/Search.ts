import { QueryBuilder } from "./QueryBuilder";

export interface ISearch {
  search(data: { fields: string[]; value: string }): QueryBuilder;
}
