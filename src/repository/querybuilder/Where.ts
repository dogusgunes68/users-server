import { QueryBuilder } from "./QueryBuilder";

export interface IWhere {
  where(fieldCondition: string, param: any): QueryBuilder;
}
