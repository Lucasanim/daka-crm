import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import UserMenu from "./UserMenu";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader
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
          <UserMenu />
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
