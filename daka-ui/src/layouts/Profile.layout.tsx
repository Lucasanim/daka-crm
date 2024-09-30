import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Tag,
  Typography,
  Layout,
  message,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { StoreData } from "../infrastructure/state/store/Store";
import { updateProfile } from "../service/UserService";

const { Title } = Typography;

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useSelector((state: StoreData) => state?.auth.user);

  const handleUpdate = async () => {
    try {
      await updateProfile({ ...user!, firstName, lastName });
      setIsEditing(false);
      message.success("Profile updated!");
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  if (!user) return;

  return (
    <Layout>
      <Card style={{ margin: "0 auto", width: "99%" }}>
        <Title level={2}>User Settings</Title>
        <Form name="user-settings" initialValues={user || {}} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input
              value={firstName || user?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input
              value={lastName || user?.lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input disabled prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item label="Roles">
            <Space>
              {user!.roles.map((role, index) => (
                <Tag key={index} color="blue">
                  {role}
                </Tag>
              ))}
            </Space>
          </Form.Item>
          <Form.Item>
            {isEditing ? (
              <Space>
                <Button type="primary" onClick={handleUpdate}>
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </Space>
            ) : (
              <Button type="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default Profile;
