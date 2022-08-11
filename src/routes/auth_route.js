import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginProvider from "../Components/Login";

export const authRoutes = [
  {
    route: "/login",
    component: <LoginProvider />,
    exact: true,
  },
];
