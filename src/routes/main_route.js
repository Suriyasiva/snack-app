import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Page404 from "../Components/Page404";
import { authProviderContext } from "../Providers/AuthProvider";
import { appRoutes } from "./app_route";
import { authRoutes } from "./auth_route";
import SplashPage from "../pages/splash";

const MainRoute = (props) => {
  const authContext = useContext(authProviderContext);
  const { isAuthDetermined, isAuthenticated } = authContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthDetermined) {
      if (!authContext.isAuthenticated) {
        navigate("/login");
      } else {
        // navigate("/user/home");
      }
    }
  }, [isAuthDetermined, isAuthenticated]);

  useEffect(() => {
    console.log("useffect called");
    authContext.userLookup();
  }, []);

  const renderRoutes = (routes, keyPrefix = "auth-route") => {
    console.log(routes, "render routes");
    return routes.map((a) => {
      if (a.routes) {
        return (
          <Route
            key={`${keyPrefix}-${a.routes}`}
            path={a.routes}
            element={a.layout}
          >
            {renderRoutes(a.subRoutes, `${keyPrefix}-sub`)}
          </Route>
        );
      }
      return (
        <Route
          key={`${keyPrefix}-${a.route}`}
          exact={a.exact}
          element={a.component}
          path={a.route}
        />
      );
    });
  };

  const renderAuthRoute = () => {
    if (!isAuthDetermined) {
      return null;
    }
    return renderRoutes(authRoutes);
  };

  const renderAppRoute = () => {
    if (!authContext.isAuthDetermined) {
      return null;
    }
    if (!authContext.isAuthenticated) {
      return null;
    }
    return renderRoutes(appRoutes, "app-route");
  };

  return (
    <Routes>
      {renderAuthRoute()}
      {renderAppRoute()}
      {!isAuthDetermined ? (
        <Route path={"*"} element={<SplashPage />} />
      ) : (
        <Route path="*" element={<Page404 />} />
      )}
    </Routes>
  );
};

export default MainRoute;
