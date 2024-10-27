import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { Company } from "../../model/data/Company";

interface CompanyDetailsModalProps {
  visible: boolean;
  company: Company;
  onClose: () => void;
  onSave: (updatedCompany: Company) => void;
  onDelete: (companyId: number) => void;
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  visible,
  company,
  onClose,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setName(company.name);
    setAddress(company.address);
    setCategoryName(company.category.name);
  }, []);

  const handleSave = () => {
    company.name = name;
    company.address = address;
    company.category.name = categoryName;
    onSave(company);
  };

  const handleDelete = () => {
    if (company.id) {
      onDelete(company.id);
      onClose();
      message.success("Company deleted");
    }
  };

  const handleFieldChange = () => {
    setIsModified(true);
  };

  return (
    <Modal
      title="Company Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Delete Company
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          disabled={!isModified}
        >
          Save Changes
        </Button>,
      ]}
    >
      <Form
        layout="vertical"
        id="companyEditModal"
        onFieldsChange={handleFieldChange}
      >
        <Form.Item
          name="name"
          label="Company name"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input
            placeholder="Please enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input
            placeholder="Please enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        {/* 
        <Form.Item
          name="email"
          label="Email"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Input
            placeholder="Please write a category"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyDetailsModal;
