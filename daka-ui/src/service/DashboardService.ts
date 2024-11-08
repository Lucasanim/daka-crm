import { GenericClient } from "../infrastructure/http/GenericClient";
import { DashboardData } from "../model/dashboard/DashboardData";

const instance = new GenericClient("/dashboard");

export const getDashboardData = () => {
  return instance.get<DashboardData>("");
};
