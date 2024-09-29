import React, { useState } from "react";

import {
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Grid, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import Link from "antd/es/typography/Link";
import SubMenu from "antd/es/menu/SubMenu";
import { RouterTree } from "../../model/router/RouterItem";
import { Routes } from "../../infrastructure/router/Routes";
import MobileSideBar from "./MobileSideBar";

const SideBar: React.FC = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const [mobileSiderOpen, setMobileSiderOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = Routes;
  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const renderTreeView = (tree: RouterTree[]) => {
    return tree.map((item: RouterTree) => {
      const { icon, label, route, children } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={item.route}
            icon={<UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={item.route} icon={icon && React.createElement(icon)}>
          <Link onClick={() => navigate(route ?? "")}>{label}</Link>
          {!siderCollapsed && <div className="ant-menu-tree-arrow" />}
        </Menu.Item>
      );
    });
  };

  const items = renderTreeView(menuItems);

  const renderSider = () => {
    return <>{items}</>;
  };

  const renderMenu = () => {
    return (
      <Menu
        mode="inline"
        style={{
          paddingTop: "8px",
          border: "none",
          overflow: "auto",
          height: "calc(100% - 72px)",
          background: "transparent",
        }}
        onClick={() => {
          setMobileSiderOpen(false);
        }}
      >
        {renderSider()}
      </Menu>
    );
  };

  if (isMobile) {
    return (
      <MobileSideBar
        mobileSiderOpen={mobileSiderOpen}
        setMobileSiderOpen={setMobileSiderOpen}
        renderMenu={renderMenu}
      />
    );
  }

  const siderStyles: React.CSSProperties = {
    backgroundColor: "#F7F8F9",
    borderRight: `1px solid rgb(232, 233, 234)`,
    position: "sticky",
    top: 0,
    left: 0,
    height: "100vh",
    zIndex: 999,
  };

  return (
    <>
      <Layout.Sider
        style={siderStyles}
        width={256}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setSiderCollapsed(collapsed);
          }
        }}
        collapsedWidth={80}
        breakpoint="lg"
        trigger={
          <Button
            type="text"
            style={{
              borderRadius: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgb(255, 255, 255)",
              borderRight: `1px solid rgb(232, 233, 234)`,
            }}
          >
            {siderCollapsed ? (
              <RightOutlined
                style={{
                  color: "rgb(22, 119, 255)",
                }}
              />
            ) : (
              <LeftOutlined
                style={{
                  color: "rgb(22, 119, 255)",
                }}
              />
            )}
          </Button>
        }
      >
        {/* <div
          style={{
            width: siderCollapsed ? "80px" : "256px",
            padding: siderCollapsed ? "0" : "0 16px",
            display: "flex",
            justifyContent: siderCollapsed ? "center" : "flex-start",
            alignItems: "center",
            height: "64px",
            //backgroundColor: token.colorBgElevated, #e6f4ff
            fontSize: "14px",
          }}
        >
          Title
        </div> */}
        {renderMenu()}
      </Layout.Sider>
    </>
  );
};

export default SideBar;
