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

  if (!isAuth) return <div>Please login to view your cart</div>;

  if (cartQuery.isLoading) return <div>Loading cart...</div>;

  if (cartQuery.isError)
    return <div>Failed to load cart. Please try again later.</div>;

  const cartProducts = cartQuery.data || [];
  const totalAmount = cartProducts.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  if (cartProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Cart</h1>
        <div>Your cart is empty.</div>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate(ROUTES_CONSTANTS.ORDER);
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      <div className="grid grid-cols-1 gap-4">
        {cartProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border rounded-lg p-3"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold">{product.title}</h3>
              <p>${product.price}</p>
              <div className="flex items-center mt-2 gap-2">
                <CButton
                  onClick={() =>
                    updateQuantity({
                      productId: product.id,
                      quantity: (product.quantity || 1) - 1,
                    })
                  }
                  disabled={(product.quantity || 1) <= 1}
                >
                  -
                </CButton>
                <span>{product.quantity || 1}</span>
                <CButton
                  onClick={() =>
                    updateQuantity({
                      productId: product.id,
                      quantity: (product.quantity || 1) + 1,
                    })
                  }
                >
                  +
                </CButton>
              </div>
            </div>
            <CButton
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => removeProduct(product.id)}
            >
              Remove
            </CButton>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Total: ${totalAmount.toFixed(2)}
        </p>
      </div>
      <CButton onClick={handleCheckout}>Buy now</CButton>
    </div>
  );
};

export default CartPage;
