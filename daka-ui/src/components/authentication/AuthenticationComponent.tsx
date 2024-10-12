import React, { useState } from "react";
import { Form, Input, Button, Typography, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  register,
} from "../../infrastructure/state/reducers/AuthReducer";
import AuthDetails from "../../model/user/AuthDetail";
import {
  loginRequest,
  registerRequest,
} from "../../service/AuthenticationService";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../../assets/crm.png";

const { Title, Text, Link } = Typography;

interface Props {
  onPasswordRecover: () => void;
}

const AuthenticationComponent: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateData = () => {
    if (isLogin) {
      return !!email && !!password && (!reachedAttempts() || captchaCompleted);
    }

    return (
      !!email &&
      !!password &&
      password === passwordConfirm &&
      !!firstName &&
      !!lastName
    );
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault();

    const userData: AuthDetails = {
      firstName,
      lastName,
      email,
      password,
    };

    setErrorMsg("");

    if (isLogin) {
      return handleLogin(userData);
    }

    handleRegister(userData);
  };

  const handleLogin = async (userData: AuthDetails) => {
    try {
      const response = await loginRequest(userData);
      // @ts-expect-error false positive
      await dispatch(login(response.data));
      navigate("/app/home");
    } catch (e) {
      console.log(e);
      setErrorMsg("Invalid credentials, please try again.");
    }
    setAttempts(attempts + 1);
  };

  const reachedAttempts = () => attempts >= 3;

  const handleRegister = async (userData: AuthDetails) => {
    try {
      const response = await registerRequest(userData);
      // @ts-expect-error false positive
      await dispatch(register(response.data));
      navigate("/app/home");
    } catch (e) {
      console.log(e);
      setErrorMsg(e.message);
    }
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaCompleted(!!value);
  };

  const handleFooterClick = () => {
    setIsLogin(!isLogin);
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

      <Title level={4} className="login-title">
        Sign in to your account
      </Title>

      <Form
        name="login"
        layout="vertical"
        onSubmitCapture={(e) => e.preventDefault()}
      >
        {!isLogin && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="jhon@gmail.com"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e)}
          />
        </Form.Item>

        {!isLogin && (
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
        )}

        {errorMsg && <Text type="danger">{errorMsg}</Text>}
        {reachedAttempts() && (
          <Form.Item>
            <Text type="danger">
              You exceeded the amount of tries, please complete the captcha.
            </Text>

            <ReCAPTCHA
              type="image"
              sitekey="6LcUllkqAAAAAN-POoPWG7x_hbJ2NUvn63HIUcfy"
              onChange={onCaptchaChange}
            />
          </Form.Item>
        )}

        {isLogin && (
          <Form.Item name="remember">
            <Link
              className="forgot-password"
              onClick={() => props.onPasswordRecover()}
            >
              Forgot password?
            </Link>
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            block
            onClick={(e) => handleSubmit(e)}
            disabled={!validateData()}
          >
            Sign {isLogin ? "in" : "up"}
          </Button>
        </Form.Item>
      </Form>

      <Text>
        {isLogin ? "Don’t" : "Already"} have an account?{" "}
        <Link onClick={handleFooterClick}>
          {isLogin ? "Sign up" : "Log in"}
        </Link>
      </Text>
    </>
  );
};

export default AuthenticationComponent;
