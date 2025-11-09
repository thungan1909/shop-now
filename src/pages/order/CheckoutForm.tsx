import React, { useState } from "react";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { notify } from "../../utils/notifyUtils";
import { useUpdateUserShipping } from "../../hooks/shipping/useUpdateUserShipping";
import { useClearCart } from "../../hooks/cart/useClearCart.hook";
import type { ShippingInfoDTO } from "../../types/dtos/shipping.dto";
import PaymentSection from "./Payment";
import CButton from "../../components/atoms/CButton/CButton";
import { FaMoneyBill } from "react-icons/fa";

interface CheckoutFormProps {
  onOrderComplete: () => void;
}

interface PaymentInfo {
  method: "card" | "paypal";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onOrderComplete }) => {
  const { userId, isAuth } = useAuthentication();
  const { mutate: updateShipping } = useUpdateUserShipping();
  const { mutate: clearCart } = useClearCart();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfoDTO>({
    recipientName: "",
    phone: "",
    email: "",
    postalCode: "",
    streetAddress: "",
    detailAddress: "",
    deliveryNote: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (!isAuth || !userId) {
      notify.warning("Please login to complete checkout.");
      return;
    }

    if (
      !shippingInfo.recipientName ||
      !shippingInfo.phone ||
      !shippingInfo.streetAddress
    ) {
      notify.error("Please fill in required fields.");
      return;
    }

    // Optional: validate payment info if method is card
    if (paymentInfo.method === "card") {
      if (
        !paymentInfo.cardNumber ||
        !paymentInfo.expiryDate ||
        !paymentInfo.cvv
      ) {
        notify.error("Please fill in card details.");
        return;
      }
    }

    // 1. Update shipping info
    updateShipping(
      { userId, shipping: shippingInfo },
      {
        onSuccess: () => {
          // 2. Clear cart
          clearCart(userId, {
            onSuccess: () => {
              notify.success("Order completed!");
              // 3. Show confirmation
              onOrderComplete();
            },
          });
        },
      }
    );
  };

  return (
    <div>
      {/* Shipping Form */}
      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Shipping Information</h2>
        <div className="mb-4">
          <label className="block font-semibold">Recipient Name*</label>
          <input
            type="text"
            name="recipientName"
            value={shippingInfo.recipientName}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Phone*</label>
          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Street Address*</label>
          <input
            type="text"
            name="streetAddress"
            value={shippingInfo.streetAddress}
            onChange={handleInputChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      {/* Payment Section */}
      <PaymentSection paymentInfo={paymentInfo} onChange={setPaymentInfo} />
      <div className="flex content-center justify-center ">
        <CButton
          onClick={handleCheckout}
          variant="contained"
          type="submit"
          size="large"
          startIcon={<FaMoneyBill />}
        >
          Place Order
        </CButton>
      </div>
    </div>
  );
};

export default CheckoutForm;
