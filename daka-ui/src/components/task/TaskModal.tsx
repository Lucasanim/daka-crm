import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { Customer } from "../../model/data/Customer";
import { Task } from "../../model/data/Task";
import moment from "moment";

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: number) => void;
  taskData?: Task;
  customers: Customer[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSave,
  onDelete,
  taskData,
  customers,
}) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (taskData) {
      form.setFieldsValue({
        ...taskData,
        customerId: taskData.customer.id,
        creationDate: moment(taskData.creationDate),
      });
      setIsEditMode(true);
    } else {
      form.resetFields();
      setIsEditMode(false);
    }
  }, [taskData, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({
          ...taskData,
          ...values,
          customer: customers.find((c) => c.id === values.customerId),
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
    if (!taskData) return <></>;
    return (
      <Button key="delete" danger onClick={() => onDelete(taskData.id)}>
        Delete
      </Button>
    );
  };

  return (
    <Modal
      title={isEditMode ? "Edit Task" : "Create Task"}
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
          label="Task Name"
          rules={[{ required: true, message: "Please enter the task name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="customerId"
          label="Customer"
          rules={[{ required: true, message: "Please select a customer" }]}
        >
          <Select placeholder="Select a customer" disabled={!!taskData}>
            {customers.map((customer) => (
              <Select.Option key={customer.id} value={customer.id}>
                {`${customer.firstName} ${customer.lastName} (${
                  customer.email || "-"
                })`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal; // Update export to TaskModal
