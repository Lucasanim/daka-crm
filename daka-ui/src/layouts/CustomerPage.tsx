import React, { useEffect, useState } from "react";
import { Button, Layout, message } from "antd";
import CustomerForm from "../components/customer/CustomerForm";
import CustomerTable from "../components/customer/CustomerTable";
import { Company } from "../model/data/Company";
import { Customer } from "../model/data/Customer";
import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../service/CustomerService";
import { getCompanies } from "../service/CompanyService";
import { Content } from "antd/es/layout/layout";

const CustomerPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddCustomer = async (customer: Customer) => {
    try {
      await createCustomer(customer);
      fetchCustomers();
      setIsModalVisible(false);
      setSelectedCustomer(undefined);
      message.success("Customer created!");
    } catch (e) {
      console.log(e);
      message.error("Creation failed");
    }
  };
  const handleUpdate = async (customer: Customer) => {
    try {
      await updateCustomer(customer);
      fetchCustomers();
      setIsModalVisible(false);
      setSelectedCustomer(undefined);
      message.success("Customer updated!");
    } catch (e) {
      console.log(e);
      message.error("Update failed");
    }
  };
  const handleDelete = async (customerId: number) => {
    try {
      await deleteCustomer(customerId);
      fetchCustomers();
      setIsModalVisible(false);
      setSelectedCustomer(undefined);
      message.success("Customer deleted!");
    } catch (e) {
      console.log(e);
      message.error("Deletion failed");
    }
  };

  const handleSelect = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchCompanies();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => setIsModalVisible(true)}
        >
          Add New Customer
        </Button>

        <div style={{ overflowX: "auto" }}>
          <CustomerTable
            onSelect={handleSelect}
            onDelete={handleDelete}
            customers={customers}
          />
        </div>

        {isModalVisible && (
          <CustomerForm
            customer={selectedCustomer}
            companies={companies}
            onSubmit={handleAddCustomer}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onClose={() => setIsModalVisible(false)}
          />
        )}
      </Content>
    </Layout>
  );
};

export default CustomerPage;
