import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../infrastructure/state/reducers/AuthReducer";
import { NavigationRoutes } from "../../infrastructure/router/NavigationRoutes";

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSettingsClick = () => {
    navigate(NavigationRoutes.APP + NavigationRoutes.PROFILE);
  };

  const handleLogoutClick = async () => {
    // @ts-expect-error false positive
    await dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="settings"
        onClick={handleSettingsClick}
        icon={<SettingOutlined />}
      >
        Settings
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={handleLogoutClick}
        icon={<LogoutOutlined />}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Avatar style={{ backgroundColor: "#1890ff" }}>U</Avatar>
    </Dropdown>
  );
};

export default UserMenu;
