import Home from "../Components/Home";
import Menu from "../Components/Menu";

export const adminRoutes = [
  {
    route: "/admin/home",
    component: <Home />,
    exact: true,
  },
  {
    route: "/admin/menu",
    component: <Menu />,
    exact: true,
  },
];
