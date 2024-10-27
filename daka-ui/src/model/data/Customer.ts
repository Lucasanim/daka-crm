import { Company } from "./Company";
import { StageType } from "./StageType";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  creationDate: string;
  stageType: StageType;
  company: Company;
}
