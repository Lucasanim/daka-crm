import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/router/ProtectedRoute";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { NavigationRoutes } from "./NavigationRoutes";

const RootRouter = () => {
  return (
    <Routes>
      <Route path={NavigationRoutes.PUBLIC + "/*"} element={<PublicRouter />} />
      <Route
        path={NavigationRoutes.APP + "/*"}
        element={
          <ProtectedRoute>
            <PrivateRouter />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={"/app" + NavigationRoutes.HOME} replace />}
      />
    </Routes>
  );
};

export default RootRouter;
