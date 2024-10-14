import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/Authentication.hook";
import { NavigationRoutes } from "../../infrastructure/router/NavigationRoutes";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = (props: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn, isActive } = useAuthentication();

  const checkUserToken = () => {
    if (!isLoggedIn) {
      return navigate(
        NavigationRoutes.PUBLIC + NavigationRoutes.AUTHENTICATION
      );
    }
    checkUserState();
  };

  const checkUserState = () => {
    if (!isActive) {
      return navigate(NavigationRoutes.PUBLIC + NavigationRoutes.ACTIVATE_SUBS);
    }
  };

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn, isActive]);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
