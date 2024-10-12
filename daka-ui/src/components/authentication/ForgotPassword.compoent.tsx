import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { sendRecoveryEmail } from "../../service/AuthenticationService";
import logo from "../../assets/crm.png";

const { Title, Text, Link } = Typography;

interface Props {
  onGoBack: () => void;
}

const ForgotPassword: React.FC<Props> = (props: Props) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const onPasswordRecovery = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      await sendRecoveryEmail(email);
      setEmailSent(true);
    } catch (e) {
      console.log(e);
    }
    message.success("If the account exist, you have received the email.");
  };

  const handleGoBack = () => {
    props.onGoBack();
  };

  const renderLogo = () => {
    return (
      <div className="login-header">
        <img src={logo} alt="Daka" className="logo" />
        <Title level={3}>Daka CRM</Title>
      </div>
    );
  };

  return (
    <>
      {renderLogo()}
      <Form name="password-recovery" layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            block
            onClick={onPasswordRecovery}
            disabled={emailSent || !email}
          >
            Send Recovery Email
          </Button>
        </Form.Item>
      </Form>
      <Text>
        <Link onClick={handleGoBack}>Go back</Link>
      </Text>
    </>
  );
};

export default ForgotPassword;
