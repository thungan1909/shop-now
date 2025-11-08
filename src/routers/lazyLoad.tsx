import { withDynamicImport } from "../utils/withDynamicImport";

// AUTHEN
export const LoginPage = withDynamicImport(() => import("../pages/Login"), {
  loading: true,
});

// export const RegisterPage = withDynamicImport(
//   () => import("../pages/authen/register/Register"),
//   {
//     loading: true,
//   }
// );
