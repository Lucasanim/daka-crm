import { UserOutlined } from "@ant-design/icons";
import { RouterTree } from "../../model/router/RouterItem";
import { NavigationRoutes } from "./NavigationRoutes";

export const Routes: RouterTree[] = [
  {
    label: "Home",
    route: NavigationRoutes.HOME,
    children: [],
    icon: UserOutlined,
  },
  {
    label: "Admin panel",
    route: NavigationRoutes.ADMIN_SEARCH,
    children: [],
    icon: UserOutlined,
  },
];
