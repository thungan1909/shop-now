import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/auth/login.hook";
import { ROUTES_CONSTANTS } from "./constants";
import { Typography } from "@mui/material";
import CButton from "../components/atoms/CButton/CButton";
import { FaArrowRight } from "react-icons/fa";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAuthentication();
  const navigate = useNavigate();

  if (!isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <Typography variant="h3">Sorry, 403 Authentication Required</Typography>
        <Typography>You need to sign in to access this page.</Typography>
        <CButton
          onClick={() => navigate(ROUTES_CONSTANTS.AUTH.LOGIN)}
          size="large"
          isRounded
          textTransform="capitalize"
        >
          Login in now
          <FaArrowRight size={24} className="ml-2" />
        </CButton>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
