import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import { NavigationRoutes } from "./NavigationRoutes";
import CompanyDashboard from "../../layouts/CompanyDashboard.layout";
import { Layout } from "antd";
import Header from "../../components/header/Header";
import AdminPanel from "../../layouts/AdminPanel.layout";
import Profile from "../../layouts/Profile.layout";
import CustomerPage from "../../layouts/CustomerPage";

const PrivateRouter = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        <Routes>
          <Route
            path={NavigationRoutes.ADMIN_SEARCH}
            element={<AdminPanel />}
          />
          <Route path={NavigationRoutes.PROFILE} element={<Profile />} />
          <Route path={NavigationRoutes.HOME} element={<CompanyDashboard />} />
          <Route path={NavigationRoutes.CUSTOMERS} element={<CustomerPage />} />
          <Route
            path={NavigationRoutes.COMPANIES}
            element={<CompanyDashboard />}
          />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default PrivateRouter;
