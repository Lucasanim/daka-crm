import { GenericClient } from "../infrastructure/http/GenericClient";
import { Task } from "../model/data/Task";

const instance = new GenericClient("/task");

export const getTasks = () => {
  return instance.get<Task[]>("");
};

export const updateTask = (task: Task) => {
  return instance.put(`/${task.id}`, task);
};

export const deleteTask = (id: number) => {
  return instance.delete(`/${id}`);
};

export const createTask = (task: Task) => {
  return instance.post("", task);
};
