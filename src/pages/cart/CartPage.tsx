import React from "react";

import { useCartQuery } from "../../hooks/cart/useCartQuery.hook";
import { useUpdateCartQuantity } from "../../hooks/cart/useUpdateCartQuantity.hook";
import { useRemoveCartProduct } from "../../hooks/cart/useRemoveCartProduct.hook";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../routers/constants";
import { FaTrash } from "react-icons/fa";
import OrderSummary from "../order/OrderSummary";
import CartEmpty from "./CartEmpty";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth, userId } = useAuthentication();
  const { cartQuery } = useCartQuery(userId);
  const { mutate: updateQuantity } = useUpdateCartQuantity(userId);
  const { mutate: removeProduct } = useRemoveCartProduct(userId);

  if (!isAuth)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
        Please login to view your cart
      </div>
    );

  if (cartQuery.isLoading)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">
        Loading cart...
      </div>
    );

  if (cartQuery.isError)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        Failed to load cart. Please try again later.
      </div>
    );

  const cartProducts = cartQuery.data || [];

  if (cartProducts.length === 0) return <CartEmpty />;

  const handleCheckout = () => {
    navigate(ROUTES_CONSTANTS.ORDER);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home <span className="mx-2">›</span> Cart
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center lg:text-left">
        YOUR CART
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="flex-1 space-y-4 lg:space-y-5">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-24 h-24 sm:w-20 sm:h-20 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">Size: Large</p>
                  <p className="text-sm text-gray-500 truncate">Color: White</p>
                  <p className="font-semibold mt-1">${product.price}</p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                <button
                  onClick={() => {
                    if ((product.quantity || 1) <= 1) {
                      removeProduct(product.id);
                    } else {
                      updateQuantity({
                        productId: product.id,
                        quantity: (product.quantity || 1) - 1,
                      });
                    }
                  }}
                  className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold"
                >
                  −
                </button>
                <span className="w-6 text-center">{product.quantity || 1}</span>
                <button
                  onClick={() =>
                    updateQuantity({
                      productId: product.id,
                      quantity: (product.quantity || 1) + 1,
                    })
                  }
                  className="bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-lg font-semibold"
                >
                  +
                </button>

                <button
                  onClick={() => removeProduct(product.id)}
                  className="ml-0 sm:ml-4 text-red-500 hover:text-red-600"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="lg:w-80 w-full mt-6 lg:mt-0">
          <OrderSummary cartProducts={cartProducts} onNext={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
