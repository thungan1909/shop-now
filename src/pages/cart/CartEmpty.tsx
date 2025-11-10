import { useNavigate } from "react-router-dom";
import CButton from "../../components/atoms/CButton/CButton";
import { motion } from "framer-motion";

const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center py-20 px-4">
      {/* Illustration */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty cart illustration"
        className="w-40 h-40 mx-auto mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
      />

      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">
        Your Cart is Empty
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-8">
        Looks like you haven’t added any products yet.
      </p>

      {/* Button */}
      <CButton onClick={() => navigate("/products")} isRounded>
        Continue Shopping
      </CButton>
    </div>
  );
};

export default CartEmpty;
