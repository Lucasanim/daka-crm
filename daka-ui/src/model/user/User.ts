import { UserRole } from "./UserRole";

export default interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: Date;
  roles: UserRole[];
}
