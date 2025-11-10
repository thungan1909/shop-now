import { motion } from "framer-motion";
import { FaShoppingCart, FaTimes, FaStar } from "react-icons/fa";
import type { ProductDTO } from "../../types/dtos/product.dto";

interface ProductDetailModalProps {
  product: ProductDTO;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white rounded-3xl shadow-xl max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={22} />
        </button>

        {/* Product Image + Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={product.images?.[0] || product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/3 h-64 object-cover rounded-xl"
          />

          <div className="flex-1 flex flex-col">
            {/* Title & Brand */}
            <h2 className="text-3xl font-bold mb-1">{product.title}</h2>
            <p className="text-gray-500 mb-3 text-sm">{product.brand}</p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-600">
                {(product.rating || 5).toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price & Discount */}
            <div className="flex items-center gap-2 mb-3">
              <p className="font-semibold text-xl">
                ${product.price.toFixed(2)}
              </p>
              {product.discountPercentage && (
                <span className="bg-red-100 text-red-500 px-2 py-1 rounded text-sm font-medium">
                  -{product.discountPercentage.toFixed(1)}%
                </span>
              )}
            </div>

            {/* Availability & Stock */}
            <p className="text-green-600 font-medium mb-2">
              {product.availabilityStatus}
            </p>
            <p className="text-gray-500 text-sm mb-3">Stock: {product.stock}</p>

            {/* Description */}
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Shipping & Warranty */}
            <div className="flex flex-col gap-1 mb-4 text-gray-500 text-sm">
              <p>{product.shippingInformation}</p>
              <p>{product.warrantyInformation}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold transition flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="border-t pt-4 mt-4 text-gray-600 text-sm space-y-2">
          <p>
            <strong>Minimum Order Quantity:</strong>{" "}
            {product.minimumOrderQuantity}
          </p>
          <p>
            <strong>Weight:</strong> {product.weight}g
          </p>
          {product.dimensions && (
            <p>
              <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
              {product.dimensions.height} x {product.dimensions.depth} cm
            </p>
          )}
          <p>
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailModal;
