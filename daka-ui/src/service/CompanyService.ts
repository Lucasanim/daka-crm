import { GenericClient } from "../infrastructure/http/GenericClient";
import { Company } from "../model/data/Company";

const instance = new GenericClient("/company");

export const getCompanies = () => {
  return instance.get<Company[]>("");
};

export const updateCompany = (company: Company) => {
  return instance.put(`/${company.id}`, company);
};

export const deleteCompany = (companyId: number) => {
  return instance.delete(`/${companyId}`);
};

export const createCompany = (company: Company) => {
  return instance.post("", company);
};
