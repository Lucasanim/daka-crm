import { UserOutlined } from "@ant-design/icons";
import { RouterTree } from "../../model/router/RouterItem";
import { NavigationRoutes } from "./NavigationRoutes";

export const Routes: RouterTree[] = [
  {
    label: "Admin",
    route: NavigationRoutes.ADMIN_SEARCH,
    children: [],
    icon: UserOutlined,
  },
  {
    label: "Admin",
    route: NavigationRoutes.ADMIN_SEARCH,
    children: [],
    icon: UserOutlined,
  },
];
