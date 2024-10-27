import { CompanyCategory } from "./CompanyCategory";

export interface Company {
  id?: number;
  name: string;
  address: string;
  email?: string;
  phone?: string;
  category: CompanyCategory;
}
