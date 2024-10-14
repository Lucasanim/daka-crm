import { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavigationRoutes } from "../../infrastructure/router/NavigationRoutes";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { UserRole } from "../user/UserRole";

export type RouterTree = {
  route: NavigationRoutes;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>
  >;
  children: RouterTree[];
  role?: UserRole;
};
