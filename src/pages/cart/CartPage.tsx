import React from "react";
import CButton from "../../components/atoms/CButton/CButton";
import { useCartQuery } from "../../hooks/cart/useCartQuery.hook";
import { useUpdateCartQuantity } from "../../hooks/cart/useUpdateCartQuantity.hook";
import { useRemoveCartProduct } from "../../hooks/cart/useRemoveCartProduct.hook";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../routers/constants";

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
  const totalAmount = cartProducts.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  if (cartProducts.length === 0)
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-600">
        <h1 className="text-3xl font-bold mb-4">My Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );

  const handleCheckout = () => {
    navigate(ROUTES_CONSTANTS.ORDER);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Cart</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-500">${product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <CButton
                    onClick={() =>
                      updateQuantity({
                        productId: product.id,
                        quantity: (product.quantity || 1) - 1,
                      })
                    }
                    disabled={(product.quantity || 1) <= 1}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    -
                  </CButton>
                  <span className="px-2">{product.quantity || 1}</span>
                  <CButton
                    onClick={() =>
                      updateQuantity({
                        productId: product.id,
                        quantity: (product.quantity || 1) + 1,
                      })
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  >
                    +
                  </CButton>
                  <CButton
                    onClick={() => removeProduct(product.id)}
                    className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </CButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-96 border rounded-lg p-4 shadow bg-white flex flex-col gap-4 sticky top-6 h-fit">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <CButton
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
