import { type ReactNode } from "react";
import { useAuthentication } from "../hooks/auth/login.hook";
import Navbar from "../components/molecules/cNavbar/Navbar";
import CButton from "../components/atoms/CButton/CButton";
// import { useAuthentication } from "../hooks/auth/login.hook";
// import { ProfileAccountPage } from "../routers/lazyLoad";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../routers/constants";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuth } = useAuthentication();
  const navigate = useNavigate();

  const viewCartOnClick = () => {
    navigate(ROUTES_CONSTANTS.CART, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar isAuth={isAuth} />
      <div className={"my-24 md:m-24 px-4"}>{children}</div>

      {/* TODO: Only view cart if is not in cart page */}
      <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 ">
        <motion.div>
          <CButton
            className="!w-16 !h-16 !rounded-full shadow-xl transition-all"
            onClick={() => {
              viewCartOnClick();
            }}
          >
            <FaShoppingCart size={28} />
          </CButton>
        </motion.div>
      </div>
    </div>
  );
};
export default MainLayout;
