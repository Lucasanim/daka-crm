import React from "react";
import { Card, Avatar, Typography, Space } from "antd";
import { DraggableProvided } from "react-beautiful-dnd";
import { Task } from "../../model/data/Task";
import { PresetColors } from "antd/es/theme/internal";

const { Text } = Typography;

interface TaskCardProps {
  task: Task;
  provided: DraggableProvided;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, provided, onClick }) => {
  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onClick(task)}
      style={{
        margin: "8px 0",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        minWidth: "250 px",
        ...provided.draggableProps.style,
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          {task.name}
        </Typography.Title>
        <Text>State: {task.state}</Text>
        <Text type="secondary">
          Created: {new Date(task.creationDate).toLocaleDateString()}{" "}
        </Text>
        <Space align="center">
          <Avatar
            style={{
              backgroundColor: PresetColors[5],
              color: "black",
            }}
          >
            {task.customer.firstName.charAt(0).toUpperCase() +
              task.customer.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <Text>
            {task.customer.firstName} {task.customer.lastName}
          </Text>
        </Space>
      </Space>
    </Card>
  );
};

export default TaskCard; // Update export to TaskCard
