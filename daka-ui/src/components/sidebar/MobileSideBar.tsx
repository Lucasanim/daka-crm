import { ReactNode, type CSSProperties } from "react";

import { BarsOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout } from "antd";

const drawerButtonStyles: CSSProperties = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  position: "fixed",
  top: 64,
  zIndex: 1001,
};

interface Props {
  mobileSiderOpen: boolean;
  setMobileSiderOpen: (value: boolean) => void;
  renderMenu: () => ReactNode;
}

const MobileSideBar = (props: Props) => {
  return (
    <>
      <Drawer
        open={props.mobileSiderOpen}
        onClose={() => props.setMobileSiderOpen(false)}
        placement="left"
        closable={false}
        width={256}
        bodyStyle={{
          padding: 0,
        }}
        maskClosable={true}
      >
        <Layout>
          <Layout.Sider
            width={500}
            style={{
              height: "100vh",
              backgroundColor: "#F7F8F9",
              borderRight: `1px solid rgb(232, 233, 234)`,
            }}
          >
            <div
              style={{
                width: "256px",
                padding: "0 16px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "64px",
                backgroundColor: "rgb(255, 255, 255)",
                borderBottom: "none",
              }}
            >
              Title
            </div>
            {props.renderMenu()}
          </Layout.Sider>
        </Layout>
      </Drawer>
      <Button
        style={drawerButtonStyles}
        size="large"
        onClick={() => props.setMobileSiderOpen(true)}
        icon={<BarsOutlined />}
      />
    </>
  );
};

export default MobileSideBar;
