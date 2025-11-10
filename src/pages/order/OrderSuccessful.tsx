import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CButton from "../../components/atoms/CButton/CButton";

interface OrderSuccessfulProps {
  onContinueShopping?: () => void;
}

const OrderSuccessful: React.FC<OrderSuccessfulProps> = ({
  onContinueShopping,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
        className="mb-6"
      >
        <FaCheckCircle className="w-20 h-20 text-green-500" />
      </motion.div>

      {/* Animated Text */}
      <motion.h1
        className="text-3xl font-bold mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Thank You for Your Order!
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Your order has been placed successfully. We’ll notify you when it’s on
        the way.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <CButton onClick={onContinueShopping}>Continue Shopping</CButton>
      </motion.div>
    </div>
  );
};

export default OrderSuccessful;
