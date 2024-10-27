import React from "react";
import { Table, Tag, Space, Button } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Customer } from "../../model/data/Customer";
import { StageType } from "../../model/data/StageType";

interface CustomerTableProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onSelect,
  onDelete,
}) => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      key: "company",
    },
    {
      title: "Stage",
      dataIndex: ["stageType"], // Nested object reference
      key: "stageType",
      render: (stage: StageType) => (
        <Tag color={stage ? "green" : "red"}>{stage?.toString() || "N/A"}</Tag>
      ),
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Customer) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => onSelect(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={customers} rowKey="id" />;
};

export default CustomerTable;
