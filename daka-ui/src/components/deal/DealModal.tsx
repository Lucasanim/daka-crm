import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, DatePicker, Select } from "antd";
import { Customer } from "../../model/data/Customer";
import { Deal } from "../../model/data/Deal";
import moment from "moment";

interface DealModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (deal: Deal) => void;
  onDelete: (dealId: number) => void;
  dealData?: Deal;
  customers: Customer[];
}

const DealModal: React.FC<DealModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  dealData,
  customers,
}) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (dealData) {
      form.setFieldsValue({
        ...dealData,
        customerId: dealData.customer.id,
        creationDate: moment(dealData.creationDate),
        finishDate: moment(dealData.finishDate),
      });
      setIsEditMode(true);
    } else {
      form.resetFields();
      setIsEditMode(false);
    }
  }, [dealData, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({
          ...dealData,
          ...values,
          customer: customers.find((c) => (c.id = values.customerId)),
        });
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleClose = () => {
    form.resetFields();
    setIsEditMode(false);
    onClose();
  };

  const getDeleteButton = () => {
    if (!dealData) return <></>;
    return (
      <Button key="delete" danger onClick={() => onDelete(dealData.id)}>
        Delete
      </Button>
    );
  };

  return (
    <Modal
      title={isEditMode ? "Edit Deal" : "Create Deal"}
      visible={visible}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          {isEditMode ? "Update" : "Create"}
        </Button>,
        getDeleteButton(),
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Deal Name"
          rules={[{ required: true, message: "Please enter the deal name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerId"
          label="Customer"
          rules={[{ required: true, message: "Please select a customer" }]}
        >
          <Select placeholder="Select a customer" disabled={!!dealData}>
            {customers.map((customer) => (
              <Select.Option key={customer.id} value={customer.id}>
                {`${customer.firstName} ${customer.firstName} (${
                  customer.email || "-"
                })`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="finishDate" label="Finish Date">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DealModal;
