import React, { useState } from "react";
import { Form, Input, Button, Select, Modal } from "antd";
import { Company } from "../../model/data/Company";
import { Customer } from "../../model/data/Customer";
import { StageType } from "../../model/data/StageType";

interface CustomerFormProps {
  customer?: Customer;
  companies: Company[];
  onSubmit: (customer: Customer) => void;
  onUpdate: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
  onClose: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customer,
  companies,
  onSubmit,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [edited, setEdited] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = () => {
    if (customer) {
      onDelete(customer.id);
      onClose();
    }
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const newCustomer: Customer = {
      ...customer,
      ...values,
      company: companies.find((c) => (c.id = values.companyId)),
      creationDate: values.creationDate
        ? values.creationDate.toISOString()
        : undefined,
    };
    if (customer) return onUpdate(newCustomer);
    onSubmit(newCustomer);
  };

  return (
    <Modal
      title="Customer"
      visible={true}
      onCancel={onClose}
      footer={[
        <Button
          disabled={!customer}
          key="delete"
          type="primary"
          danger
          onClick={handleDelete}
        >
          Delete customer
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save {customer && edited ? "changes" : ""}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          customer ? { ...customer, companyId: customer.company.id } : undefined
        }
        onValuesChange={() => setEdited(!!customer)}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name="companyId"
          rules={[{ required: true }]}
        >
          <Select>
            {companies.map((company) => (
              <Select.Option key={company.id} value={company.id}>
                {company.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Stage" name="stageType">
          <Select>
            {Object.keys(StageType).map((stage) => (
              <Select.Option key={stage} value={stage}>
                {stage}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerForm;
