import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import CButton from "../../components/atoms/CButton/CButton";
import { ROUTES_CONSTANTS } from "../../routers/constants";
import { motion } from "framer-motion";
import { FaHandSparkles, FaWrench } from "react-icons/fa";

const FeatureComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-6 px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="flex items-center justify-center gap-2"
      >
        <FaWrench className="w-16 h-16 text-blue-500" />
        <FaHandSparkles className="w-10 h-10 text-yellow-400" />
      </motion.div>

      {/* Title */}
      <Typography variant="h4" fontWeight="bold">
        This Feature Is Under Development
      </Typography>

      {/* Description */}
      <Typography color="text.secondary" className="max-w-md">
        We're working hard to bring this feature to you soon. Please check back
        later or return to the homepage.
      </Typography>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CButton
          size="large"
          onClick={() => navigate(ROUTES_CONSTANTS.HOMEPAGE)}
          isRounded
        >
          Go Home
        </CButton>
      </motion.div>
    </div>
  );
};

export default FeatureComingSoon;
