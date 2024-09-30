import React, { useState, useEffect } from "react";
import {
  Layout,
  Input,
  Table,
  Button,
  Modal,
  Typography,
  Space,
  Tag,
  Select,
  Form,
  Popconfirm,
  message,
} from "antd";
import {
  SearchOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteUser, searchUsers, updateUser } from "../service/AdminService";
import User from "../model/user/User";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const state = ["Enabled", "Disabled"];

const AdminPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async (value?: string) => {
    const response = await searchUsers(value || "");
    setUsers(response.data || []);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedUser) {
      setEditedUser({ ...selectedUser });
      form.setFieldsValue(selectedUser);
    }
  }, [selectedUser, form]);

  const handleInputChange = (changedValues: any, allValues: any) => {
    setEditedUser(allValues);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      if (!editedUser || !selectedUser) return;

      await updateUser({
        ...editedUser,
        roles: selectedUser.roles,
        id: selectedUser.id,
      });
      setSelectedUser(editedUser);
      setHasChanges(false);
      message.success("User updated successfully");
      fetchUsers(searchTerm);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedUser) return;

      await deleteUser(selectedUser.id);
      setIsModalVisible(false);
      message.success("User deleted successfully");
      fetchUsers(searchTerm);
    } catch (e) {
      console.log(e);
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: User) => (
        <Button
          icon={<InfoCircleOutlined />}
          onClick={() => {
            setSelectedUser(record);
            setIsModalVisible(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 16px" }}>
        <Title level={3}>User Management</Title>
      </Header>
      <Content style={{ padding: "24px" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Search users email"
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Space>

        <Modal
          title={
            <Space>
              User Details
              {hasChanges && <Tag color="warning">Unsaved Changes</Tag>}
            </Space>
          }
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setHasChanges(false);
          }}
          footer={[
            <Popconfirm
              key="delete"
              title="Are you sure you want to delete this user?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete User
              </Button>
            </Popconfirm>,
            <Button key="cancel" onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>,
            <Button
              key="save"
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save Changes
            </Button>,
          ]}
        >
          {selectedUser && (
            <Form
              form={form}
              layout="vertical"
              onValuesChange={handleInputChange}
              initialValues={selectedUser}
            >
              <Form.Item name="firstName" label="First Name">
                <Input />
              </Form.Item>
              <Form.Item name="lastName" label="Last Name">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>
              <Form.Item name="creationDate" label="Creation Date">
                <Input disabled />
              </Form.Item>
              <Form.Item name="state" label="State">
                <Select>
                  {state.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="plan" label="Plan">
                <Select>
                  {state.map((role, index) => (
                    <Option key={role} value={role}>
                      Plan {index}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default AdminPanel;
