import CButton from "../../components/atoms/CButton/CButton";

interface OrderSummaryProps {
  cartProducts: {
    id: number;
    title: string;
    price: number;
    quantity?: number;
  }[];
  onNext?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartProducts,
  onNext,
}) => {
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
          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          {onNext && (
            <CButton onClick={onNext} className="w-full" isRounded>
              Proceed to Shipping
            </CButton>
          )}
        </>
      )}
    </div>
  );
};

export default OrderSummary;
