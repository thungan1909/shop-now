import CButton from "../../components/atoms/CButton/CButton";
import type { OrderSummaryProps } from "./types";

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartProducts,
  onNext,
}) => {
  const subtotal =
    cartProducts.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0) || 0;
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className=" bg-white border rounded-2xl shadow-sm p-8 h-fit">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount (-20%)</span>
          <span className="text-red-500">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t mt-4 pt-3 flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* Promo Code */}
      <div className="flex mt-5">
        <input
          type="text"
          placeholder="Add promo code"
          className="flex-1 px-4 py-3 text-sm rounded-l-full border border-gray-300 focus:outline-none"
        />
        <button className="!bg-black !text-white !px-6 flex items-center justify-center !rounded-r-full">
          ✓
        </button>
      </div>

      {/* Checkout Button */}
      {onNext && (
        <div className="mt-8">
          <CButton
            onClick={onNext}
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
            isRounded
          >
            Go to Checkout →
          </CButton>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
