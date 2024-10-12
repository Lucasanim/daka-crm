import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreData } from "../state/store/Store";
import { NavigationRoutes } from "./NavigationRoutes";
import PasswordRecovery from "../../components/authentication/PasswordRecoveryComponent";
import AuthenticationView from "../../layouts/authentication/AuthenticationView.layout";
import ActivateSubscription from "../../layouts/ActivateSubscription.layout";

const PublicRouter = () => {
  const isUserLoggedIn = useSelector(
    (store: StoreData) => store?.auth?.token?.accessToken
  );
  return (
    <>
      <Routes>
        {!isUserLoggedIn && (
          <Route
            path={NavigationRoutes.AUTHENTICATION}
            element={<AuthenticationView />}
          />
        )}
        <Route
          path={NavigationRoutes.PASSWORD_RECOVERY}
          element={<PasswordRecovery />}
        />
        {isUserLoggedIn && (
          <Route
            path={NavigationRoutes.ACTIVATE_SUBS}
            element={<ActivateSubscription />}
          />
        )}
        <Route
          path="*"
          element={<Navigate to={"/app" + NavigationRoutes.HOME} replace />}
        />
      </Routes>
    </>
  );
};

export default PublicRouter;
