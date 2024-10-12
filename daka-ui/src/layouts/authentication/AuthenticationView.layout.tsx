import React, { useState } from "react";
import ForgotPassword from "../../components/authentication/ForgotPassword.compoent";
import { LoginPhase } from "../../model/LoginPhase";
import AuthenticationComponent from "../../components/authentication/AuthenticationComponent";
import "./AuthenticationComponent.css";

const AuthenticationView: React.FC = () => {
  const [phase, setPhase] = useState(LoginPhase.LOGIN);

  const getBodyByPhase = () => {
    return {
      LOGIN: (
        <AuthenticationComponent
          onPasswordRecover={() => setPhase(LoginPhase.RECOVER)}
        />
      ),
      RECOVER: <ForgotPassword onGoBack={() => setPhase(LoginPhase.LOGIN)} />,
    }[phase];
  };

  return (
    <div className="login-container">
      <div className="login-box">{getBodyByPhase()}</div>
    </div>
  );
};

export default AuthenticationView;
