import React from "react";
import LoginProvider from "../Components/Login";

export const authRoutes = [
  {
    route: "/login",
    component: <LoginProvider />,
    exact: true,
  },
];
