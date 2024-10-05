import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import "./AuthenticationComponent.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
} from "../../infrastructure/state/reducers/AuthReducer";
import AuthDetails from "../../model/user/AuthDetail";
import { sendRecoveryEmail } from "../../service/AuthenticationService";

const { Title, Text, Link } = Typography;

const AuthenticationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isRecover, setIsRecover] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
      // @ts-expect-error false positive
      await dispatch(login(userData));
    } else {
      // @ts-expect-error false positive
      await dispatch(register(userData));
    }
    navigate("/app/home");
  };

  const handleCancel = () => {
    setIsRecover(false);
  };

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

  const getRecoveryBody = () => {
    return (
      <>
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
          <Link onClick={handleCancel}>Go back</Link>
        </Text>
      </>
    );
  };

  const getAuthBody = () => {
    return (
      <>
        <div className="login-header">
          {/* <img
            src="https://example.com/logo.png"
            alt="Globex Corporation"
            className="logo"
          /> */}
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

          <Form.Item name="remember" valuePropName="checked">
            <Link
              className="forgot-password"
              onClick={() => setIsRecover(true)}
            >
              Forgot password?
            </Link>
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
      </>
    );
  };

  const getBody = () => {
    if (isRecover) return getRecoveryBody();

    return getAuthBody();
  };

  return (
    <div className="login-container">
      <div className="login-box">{getBody()}</div>
    </div>
  );
};

export default AuthenticationComponent;
