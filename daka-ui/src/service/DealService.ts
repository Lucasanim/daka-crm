import { GenericClient } from "../infrastructure/http/GenericClient";
import { Deal } from "../model/data/Deal";

const instance = new GenericClient("/deal");

export const getDeals = () => {
  return instance.get<Deal[]>("");
};

export const updateDeal = (deal: Deal) => {
  return instance.put(`/${deal.id}`, deal);
};

export const deleteDeal = (dealId: number) => {
  return instance.delete(`/${dealId}`);
};

export const createDeal = (deal: Deal) => {
  return instance.post("", deal);
};
