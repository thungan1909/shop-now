import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import logo from "../../../assets/logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { ROUTES_CONSTANTS } from "../../../routers/constants";
import CButton from "../../atoms/CButton/CButton";
import { menuItems, primaryMenuItems } from "./constants";
import { getLinkClassName } from "../../../utils/activeLinkUtils";
import CUserProfileAvatar from "../CUserProfile/cUserProfile";

interface NavbarProps {
  isAuth: boolean;
}

const Navbar = ({ isAuth }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<"mobile" | "more" | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpenMenu(null);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex items-center shadow px-6 py-3 fixed top-0 w-full backdrop-blur-md bg-white z-50 h-16 space-x-4">
      <div className="flex items-center gap-x-6">
        <img src={logo} alt="EasyEnglish logo" className="h-8" />

        <ul className="hidden md:flex gap-x-6">
          {primaryMenuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`transition ${getLinkClassName(
                  item.href,
                  location
                )}`}
                onClick={() => setOpenMenu(null)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpenMenu(openMenu === "mobile" ? null : "mobile")}
        >
          {openMenu === "mobile" ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {openMenu === "mobile" && (
          <div className="absolute top-16 left-16 max-w-[80%] bg-white shadow rounded-2xl">
            <ul className="flex flex-col gap-y-4 text-gray-700 p-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`transition ${getLinkClassName(
                      item.href,
                      location
                    )}`}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {isAuth ? (
          <>
            <div className="hidden md:flex items-center space-x-4">
              <FaBell className="text-gray-500 cursor-pointer hover:text-black transition" />
            </div>
            <CUserProfileAvatar />
          </>
        ) : (
          <div className="flex gap-3">
            <CButton
              variant="text"
              onClick={() => {
                navigate(ROUTES_CONSTANTS.AUTH.LOGIN);
              }}
            >
              Login
            </CButton>

            <CButton
              isRounded
              onClick={() => {
                navigate(ROUTES_CONSTANTS.AUTH.REGISTER);
              }}
            >
              Register now
            </CButton>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
