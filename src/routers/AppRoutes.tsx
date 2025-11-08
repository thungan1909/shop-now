import React, { Suspense, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { generateRoute } from "./generateRoute";
import { authenRoutes, mainRoutes, simpleRoutes } from "./paths";

const AppRoutes = () => {
  const authenMenu = useMemo(() => {
    return generateRoute(authenRoutes);
  }, []);

  const simpleMenu = useMemo(() => {
    return generateRoute(simpleRoutes);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {authenMenu}
          {mainRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<>{route.element}</>}
            />
          ))}
          {simpleMenu}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default React.memo(AppRoutes);
