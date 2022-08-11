import React from "react";
import Admin from "../Components/Admin";
import UsersProvider from "../Components/Users";
import { adminRoutes } from "./admin_route";

export const appRoutes = [
  {
    route: "/user/home",
    exact: true,
    component: <UsersProvider />,
  },

  // admin routes
  {
    routes: "/admin",
    layout: <Admin />,
    subRoutes: adminRoutes,
  },
  // {
  //   route: "/admin/menu",
  //   exact: true,
  //   component: <MenuP />,
  // },
];
