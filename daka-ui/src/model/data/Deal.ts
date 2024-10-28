import { Customer } from "./Customer";
import { DealState } from "./DealState";

export interface Deal {
  id: number;
  name: string;
  amount: number;
  creationDate: Date;
  finishDate: Date;
  customer: Customer;
  state: DealState;
}
