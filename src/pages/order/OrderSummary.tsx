import React from "react";

interface OrderSummaryProps {
  cartProducts: {
    id: number;
    title: string;
    price: number;
    quantity?: number;
  }[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartProducts }) => {
  const totalAmount =
    cartProducts.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0) || 0;

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="mb-2">
            {cartProducts.map((product) => (
              <li key={product.id} className="flex justify-between">
                <span>
                  {product.title} x {product.quantity || 1}
                </span>
                <span>
                  ${(product.price * (product.quantity || 1)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
