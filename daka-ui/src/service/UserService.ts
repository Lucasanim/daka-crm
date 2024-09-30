import User from "../model/user/User";
import { GenericClient } from "../infrastructure/http/GenericClient";

const instance = new GenericClient("/users");

export const getUserDetails = (userId: number | string) => {
  return instance.get<User>(`/${userId}`);
};

export const updateProfile = (user: User) => {
  return instance.put(`/update`, user);
};
