import React, { useState } from "react";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useCartQuery } from "../../hooks/cart/useCartQuery.hook";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import { notify } from "../../utils/notifyUtils";

const OrderPage: React.FC = () => {
  const { isAuth, userId } = useAuthentication();
  const { cartQuery } = useCartQuery(userId);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isAuth) return <div>Please login to view your order.</div>;
  if (!cartQuery.data || cartQuery.data.length === 0)
    return <div>Your cart is empty.</div>;

  const handleOrderComplete = () => {
    notify.success("Order completed!");
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Order summary */}
      <OrderSummary cartProducts={cartQuery.data} />

      {/* Checkout form */}
      <CheckoutForm onOrderComplete={handleOrderComplete} />
    </div>
  );
};

export default OrderPage;
