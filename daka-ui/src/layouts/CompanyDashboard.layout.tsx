import React from "react";
import {
  Layout,
  Input,
  Button,
  Card,
  Avatar,
  Row,
  Col,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

interface Company {
  id: string;
  name: string;
  logo: string;
  openDealsAmount: number;
  relatedContacts: string[];
  salesOwner: string;
}

const CompanyCard: React.FC<{ company: Company }> = ({ company }) => (
  <Card
    hoverable
    cover={
      <img
        alt={company.name}
        src={company.logo}
        style={{ height: 100, objectFit: "contain" }}
      />
    }
    actions={[<span>...</span>]}
  >
    <Card.Meta
      title={company.name}
      description={
        <>
          <Text>Open deals amount</Text>
          <Title level={4}>${company.openDealsAmount.toLocaleString()}</Title>
          <Row justify="space-between" align="middle">
            <Col>
              <Avatar.Group maxCount={3}>
                {company.relatedContacts.map((contact, index) => (
                  <Avatar key={index} src={contact} />
                ))}
              </Avatar.Group>
            </Col>
            <Col>
              <Avatar src={company.salesOwner} />
            </Col>
          </Row>
        </>
      }
    />
  </Card>
);

// Mock data for companies
const companies: Company[] = [
  {
    id: "1",
    name: "Tesla",
    logo: "path_to_tesla_logo.png",
    openDealsAmount: 0,
    relatedContacts: ["path_to_contact1.png"],
    salesOwner: "path_to_sales_owner1.png",
  },
  // Add more company objects here...
];

const CompanyDashboard: React.FC = () => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        minHeight: 280,
      }}
    ></Content>
  );
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        background: "#fff",
        minHeight: 280,
      }}
    >
      <Row
        gutter={[16, 16]}
        justify="space-between"
        align="middle"
        style={{ marginBottom: 16 }}
      >
        <Col xs={24} sm={12}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ width: "100%" }}
          >
            Add new company
          </Button>
        </Col>
        <Col xs={24} sm={12}>
          <Search placeholder="Search by name" style={{ width: "100%" }} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {companies.map((company) => (
          <Col key={company.id} xs={24} sm={12} md={8} lg={6}>
            <CompanyCard company={company} />
          </Col>
        ))}
      </Row>
    </Content>
  );
};

export default CompanyDashboard;
