import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/auth/login.hook";
import Navbar from "../components/molecules/cNavbar/Navbar";
import CButton from "../components/atoms/CButton/CButton";
import { ROUTES_CONSTANTS } from "../routers/constants";
import { FaShoppingCart } from "react-icons/fa";
import type { ReactNode } from "react";
import { useCartButton } from "./CartButtonProvider";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuth } = useAuthentication();
  const navigate = useNavigate();
  const { cartButtonRef } = useCartButton();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar isAuth={isAuth} />
      <div>{children}</div>

      <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3">
        <CButton
          ref={cartButtonRef}
          className="!w-16 !h-16 !rounded-full shadow-xl transition-all"
          onClick={() => navigate(ROUTES_CONSTANTS.CART, { replace: true })}
        >
          <FaShoppingCart size={28} />
        </CButton>
      </div>
    </div>
  );
};

export default MainLayout;
