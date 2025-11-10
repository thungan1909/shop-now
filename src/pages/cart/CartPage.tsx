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
      <h1 className="text-4xl font-extrabold mb-8">YOUR CART</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="flex-1 space-y-5">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-500">Size: Large</p>
                  <p className="text-sm text-gray-500">Color: White</p>
                  <p className="font-semibold mt-2">${product.price}</p>
                </div>
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity({
                      productId: product.id,
                      quantity: (product.quantity || 1) - 1,
                    })
                  }
                  disabled={(product.quantity || 1) <= 1}
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
                  className="ml-4 text-red-500 hover:text-red-600"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <OrderSummary cartProducts={cartProducts} onNext={handleCheckout} />
      </div>
    </div>
  );
};

export default CartPage;
