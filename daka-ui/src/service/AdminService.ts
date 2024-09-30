import User from "../model/user/User";
import { GenericClient } from "../infrastructure/http/GenericClient";

const instance = new GenericClient("/admin");

export const searchUsers = (value: string) => {
  return instance.get<User[]>(`/search?value=${value}`);
};

export const updateUser = (user: User) => {
  return instance.put(`/update`, user);
};

export const deleteUser = (id: number) => {
  return instance.delete(`/delete/${id}`);
};
