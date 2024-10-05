import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreData } from "../state/store/Store";
import { NavigationRoutes } from "./NavigationRoutes";
import AuthenticationComponent from "../../components/authentication/AuthenticationComponent";
import PasswordRecovery from "../../components/authentication/PasswordRecoveryComponent";

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
            element={<AuthenticationComponent />}
          />
        )}
        <Route
          path={NavigationRoutes.PASSWORD_RECOVERY}
          element={<PasswordRecovery />}
        />
        <Route
          path="*"
          element={<Navigate to={"/app" + NavigationRoutes.HOME} replace />}
        />
      </Routes>
    </>
  );
};

export default PublicRouter;
