import React from "react";
import Admin from "../Components/Admin";
import UserProvider from "../Components/User";
import { adminRoutes } from "./admin_route";

export const appRoutes = [
  {
    route: "/user/home",
    exact: true,
    component: <UserProvider />,
  },

  // admin routes
  {
    routes: "/admin",
    layout: <Admin />,
    subRoutes: adminRoutes,
  },
];
