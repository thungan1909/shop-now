import PageNotFound from "../pages/common-pages/PageNotFound";
import type { RouteItemConfig } from "../types/route-config";
import { ROUTES_CONSTANTS } from "./constants";
import { HomePage, LoginPage } from "./lazyLoad";

const simpleRoutes: RouteItemConfig[] = [
  {
    path: ROUTES_CONSTANTS.AUTH.PAGE_NOT_FOUND,
    element: <PageNotFound />,
    showWithPermission: true,
  },
];

const mainRoutes: RouteItemConfig[] = [
  {
    path: ROUTES_CONSTANTS.HOMEPAGE,
    element: <HomePage />,
    showWithPermission: true,
  },
];

const authenRoutes: RouteItemConfig[] = [
  {
    path: ROUTES_CONSTANTS.AUTH.LOGIN,
    element: <LoginPage />,
    showWithPermission: true,
  },
];

export { authenRoutes, mainRoutes, simpleRoutes };
