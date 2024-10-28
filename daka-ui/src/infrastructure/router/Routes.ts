import {
  DollarOutlined,
  PieChartOutlined,
  ShopOutlined,
  SnippetsOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RouterTree } from "../../model/router/RouterItem";
import { NavigationRoutes } from "./NavigationRoutes";
import { UserRole } from "../../model/user/UserRole";

export const Routes: RouterTree[] = [
  {
    label: "Home",
    route: NavigationRoutes.HOME,
    children: [],
    icon: PieChartOutlined,
  },
  {
    label: "Customers",
    route: NavigationRoutes.CUSTOMERS,
    children: [],
    icon: UserOutlined,
  },
  {
    label: "Companies",
    route: NavigationRoutes.COMPANIES,
    children: [],
    icon: ShopOutlined,
  },
  {
    label: "Deals",
    route: NavigationRoutes.DEALS,
    children: [],
    icon: DollarOutlined,
  },
  {
    label: "Tasks",
    route: NavigationRoutes.TASKS,
    children: [],
    icon: SnippetsOutlined,
  },
  {
    label: "Admin panel",
    route: NavigationRoutes.ADMIN_SEARCH,
    children: [],
    icon: UsergroupAddOutlined,
    role: UserRole.ADMIN,
  },
];
