import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { confirmAccountRecover } from "../../service/AuthenticationService";
import { NavigationRoutes } from "../../infrastructure/router/NavigationRoutes";
import "./PasswordRecovery.css";

const { Title, Text } = Typography;

const PasswordRecovery: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    if (!token) {
      message.error("Invalid token provided.");
      return;
    }

    try {
      await confirmAccountRecover(password, token);
      message.success("Password changed!");
      navigate(NavigationRoutes.PUBLIC + NavigationRoutes.AUTHENTICATION);
    } catch (e) {
      console.log(e);
      message.error("The provided code is either invalid or expired.");
    }
  };

  const disableButton = () => {
    return !password || !passwordConfirm || password !== passwordConfirm;
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <Title level={3}>Reset Your Password</Title>
        <Text>Enter your new password below.</Text>

        <Form
          name="reset-password"
          layout="vertical"
          className="reset-password-form"
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Confirm new password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              onClick={handleReset}
              disabled={disableButton()}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
