import User from "../model/user/User";
import { GenericClient } from "../infrastructure/http/GenericClient";

const instance = new GenericClient("/users");

export const getUserDetails = () => {
  return instance.get<User>("");
};

export const updateProfile = (user: User) => {
  return instance.put(`/update`, user);
};
