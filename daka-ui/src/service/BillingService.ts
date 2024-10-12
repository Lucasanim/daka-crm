import { GenericClient } from "../infrastructure/http/GenericClient";
import { BillingPlan } from "../model/billing/BillingPlan";

const instance = new GenericClient("/billing");

export const createSubscription = (
  paymentMethodId: string,
  plan: BillingPlan
) => {
  return instance.post<string>("/subscription", { paymentMethodId, plan });
};
