// src/components/LoginForm.tsx
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import "./AuthenticationComponent.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
} from "../../infrastructure/state/reducers/AuthReducer";
import AuthDetails from "../../model/user/AuthDetail";

const { Title, Text, Link } = Typography;

const AuthenticationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const validateData = () => {
    let valid = true;
    if (isLogin) {
      valid = !!email && !!password;
    } else {
      valid =
        !!email && !!password && password === passwordConfirm && !!username;
    }

    return valid;
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!validateData()) {
      return;
    }
    const userData: AuthDetails = {
      email,
      password,
      username,
    };

    if (isLogin) {
      await dispatch(login(userData));
    } else {
      await dispatch(register(userData));
    }
    navigate("/app/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img
            src="https://example.com/logo.png" // Use your own logo URL
            alt="Globex Corporation"
            className="logo"
          />
          <Title level={3}>Daka CRM</Title>
        </div>

        <Title level={4} className="login-title">
          Sign in to your account
        </Title>

        <Form name="login" initialValues={{ remember: true }} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="jhon@gmail.com"
              onChange={(e) => handleEmailChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => handlePasswordChange(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block onClick={(e) => handleSubmit(e)}>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Text>
          Don’t have an account? <Link href="#">Sign up</Link>
        </Text>
      </div>
    </div>
  );
};

export default AuthenticationComponent;
