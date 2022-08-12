import Home from "../Components/Home";
import Menu from "../Components/Menu";
import CreateMenuProvider from "../Components/CreateMenu";
import SendMenu from "../Components/SendMenu";
import Submission from "../Components/Submission";
import Users from "../Components/Users";
import UserEdit from "../Components/UserEdit";
import EditMenuProvider from "../Components/EditMenu";

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
  {
    route: "/admin/createMenu",
    component: <CreateMenuProvider />,
    exact: true,
  },
  {
    route: "/admin/sendMenu",
    component: <SendMenu />,
    exact: true,
  },
  {
    route: "/admin/submission",
    component: <Submission />,
    exact: true,
  },
  {
    route: "/admin/users",
    component: <Users />,
    exact: true,
  },
  {
    route: "/admin/editUser/:id",
    component: <UserEdit />,
    exact: true,
  },
  {
    route: "/admin/editMenu/:id",
    component: <EditMenuProvider />,
    exact: true,
  },
];
