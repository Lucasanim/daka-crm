import { Avatar, Col, Layout, Row, Typography } from "antd";

const { Title } = Typography;

const Header = () => {
  return (
    <Layout.Header
      style={{
        background: "#fff",
        padding: "0 16px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4} style={{ margin: 0, display: "inline-block" }}>
            Daka CRM
          </Title>
        </Col>
        <Col>
          <Avatar style={{ backgroundColor: "#1890ff" }}>U</Avatar>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
