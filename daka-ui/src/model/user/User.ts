import { UserRole } from "./UserRole";
import { UserState } from "./UserState";

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: Date;
  roles: UserRole[];
  state: UserState;
}
