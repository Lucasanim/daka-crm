import React from "react";
import { Card, Avatar, Typography, Space } from "antd";
import { DraggableProvided } from "react-beautiful-dnd";
import { Deal } from "../../model/data/Deal";
import { PresetColors } from "antd/es/theme/internal";

const { Text } = Typography;

interface DealCardProps {
  deal: Deal;
  provided: DraggableProvided;
  onClick: (deal: Deal) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, provided, onClick }) => {
  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onClick(deal)}
      style={{
        margin: "8px 0",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        ...provided.draggableProps.style,
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          {deal.name}
        </Typography.Title>
        <Text>Amount: ${deal.amount.toFixed(2)}</Text>
        <Text type="secondary">
          Created: {new Date(deal.creationDate).toLocaleDateString()}
        </Text>
        <Space align="center">
          <Avatar
            style={{
              backgroundColor: PresetColors[5],
              color: "black",
            }}
          >
            {deal.customer.firstName.charAt(0).toUpperCase() +
              deal.customer.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <Text>
            {deal.customer.firstName} {deal.customer.lastName}
          </Text>
        </Space>
      </Space>
    </Card>
  );
};

export default DealCard;
