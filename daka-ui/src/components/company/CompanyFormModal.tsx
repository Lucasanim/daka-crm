import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Company } from "../../model/data/Company";

interface CompanyFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
}

const CompanyFormModal: React.FC<CompanyFormModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    const company: Company = {
      name,
      address,
      category: {
        name: categoryName,
      },
    };

    onSave(company);
  };

  return (
    <Modal
      title="Add new company"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" name="companyForm">
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
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please write a category" }]}
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

export default CompanyFormModal;
