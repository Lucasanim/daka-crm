import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import { NavigationRoutes } from "./NavigationRoutes";
import CompanyDashboard from "../../layouts/CompanyDashboard.layout";
import { Layout } from "antd";
import Header from "../../components/header/Header";

const PrivateRouter = () => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SideBar />
        {/* Routes */}
        <Routes>
          <Route
            path={NavigationRoutes.ADMIN_SEARCH}
            element={<CompanyDashboard />}
          />
          <Route path={NavigationRoutes.HOME} element={<CompanyDashboard />} />
          {/* 
          <Route
            path={NavigationRoutes.DISCUSSION + "/:id"}
            element={<DiscussionDetailPage />}
          />
          <Route path={NavigationRoutes.CHAT} element={<ChatPage />} />
          <Route path={NavigationRoutes.CHAT + "/:id"} element={<ChatPage />} />
          <Route
            path={NavigationRoutes.SEARCH_USER}
            element={<SearchUsersPage />}
          />
          <Route
            path={NavigationRoutes.PROFILE + "/:id"}
            element={<ProfilePage />}
          /> */}
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </Layout>
    </Layout>
  );
};

export default PrivateRouter;
