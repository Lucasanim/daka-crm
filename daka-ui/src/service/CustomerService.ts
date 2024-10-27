import { GenericClient } from "../infrastructure/http/GenericClient";
import { Customer } from "../model/data/Customer";

const instance = new GenericClient("/customer");

export const getCustomers = () => {
  return instance.get<Customer[]>("");
};

export const updateCustomer = (customer: Customer) => {
  return instance.put(`/${customer.id}`, customer);
};

export const deleteCustomer = (customerId: number) => {
  return instance.delete(`/${customerId}`);
};

export const createCustomer = (customer: Customer) => {
  return instance.post("", customer);
};
