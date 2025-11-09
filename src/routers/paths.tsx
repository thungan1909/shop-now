import PageNotFound from "../pages/common-pages/PageNotFound";
import OrderPage from "../pages/order/OrderPage";
import type { RouteItemConfig } from "../types/route-config";
import { ROUTES_CONSTANTS } from "./constants";
import { CartPage, HomePage, LoginPage } from "./lazyLoad";
import ProtectedRoute from "./ProtectedRoute";

const simpleRoutes: RouteItemConfig[] = [
  {
    path: ROUTES_CONSTANTS.AUTH.PAGE_NOT_FOUND,
    element: <PageNotFound />,
    // showWithPermission: true,
  },
];

const mainRoutes: RouteItemConfig[] = [
  {
    path: ROUTES_CONSTANTS.HOMEPAGE,
    element: <HomePage />,
    // showWithPermission: true,
  },
  {
    path: ROUTES_CONSTANTS.CART,
    element: (
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ROUTES_CONSTANTS.ORDER,
    element: (
      <ProtectedRoute>
        <OrderPage />
      </ProtectedRoute>
    ),
  },
];

const authenRoutes: RouteItemConfig[] = [
  {
    path: ROUTES_CONSTANTS.AUTH.LOGIN,
    element: <LoginPage />,
    // showWithPermission: true,
  },
];

export { authenRoutes, mainRoutes, simpleRoutes };
