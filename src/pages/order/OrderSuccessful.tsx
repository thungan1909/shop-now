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
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col items-center">
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
          className="text-3xl font-extrabold mb-2 text-gray-800 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Thank You for Your Order!
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 text-center"
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
          className="w-full"
        >
          <CButton
            onClick={onContinueShopping}
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
            isRounded
          >
            Continue Shopping
          </CButton>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessful;
