import { Customer } from "./Customer";
import { TaskState } from "./TaskState";

export interface Task {
  id: number;
  name: string;
  userId: number;
  state: TaskState;
  creationDate: Date;
  customer: Customer;
}
