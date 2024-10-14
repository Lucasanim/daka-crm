import CheckoutForm from "../components/billing/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./authentication/AuthenticationComponent.css";
import { useSelector } from "react-redux";
import { StoreData } from "../infrastructure/state/store/Store";
import { UserState } from "../model/user/UserState";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../infrastructure/router/NavigationRoutes";
import { Typography } from "antd";
import logo from "../assets/crm.png";
import { useEffect } from "react";

const { Title, Text } = Typography;

const stripePromise = loadStripe(
  "pk_test_51IKQbmF87Y56UerjUpytRBOmTyAXc5nBtvZKl62OyKFm5fQ0u08yPSPEAZdnRs2czoxfrE3WAGj1hMFdg6BdwDvr00M62xa7F9"
);

const ActivateSubscription = () => {
  const user = useSelector((state: StoreData) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    validateUser();
  }, [user]);

  const validateUser = () => {
    if (user?.state === UserState.ACTIVE) {
      navigate(NavigationRoutes.APP + NavigationRoutes.HOME);
      return <></>;
    }
  };

  validateUser();

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <img src={logo} alt="Daka" className="logo" />
            <Title level={3}>Daka CRM</Title>
          </div>
          <Text>Subscribe to one of our plans to start using Daka!</Text>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default ActivateSubscription;
