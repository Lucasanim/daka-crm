import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
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

  const [form] = Form.useForm();

  // const handleSave = () => {
  //   company.name = name;
  //   company.address = address;
  //   company.category.name = categoryName;
  //   onSave(company);
  // };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({
          ...company,
          ...values,
          category: { name: values.categoryName },
        });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleDelete = () => {
    if (company.id) {
      onDelete(company.id);
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
        form={form}
        layout="vertical"
        id="companyEditModal"
        onFieldsChange={handleFieldChange}
        initialValues={{ ...company, categoryName: company.category.name }}
      >
        <Form.Item
          name="name"
          label="Company name"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input placeholder="Please enter company name" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input placeholder="Please enter address" />
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
          name="categoryName"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Input placeholder="Please write a category" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CompanyDetailsModal;
