import React from "react";

interface PaymentInfo {
  method: "card" | "paypal";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentSectionProps {
  onChange: (payment: PaymentInfo) => void;
  paymentInfo: PaymentInfo;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  onChange,
  paymentInfo,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...paymentInfo, [name]: value });
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="font-bold mb-2">Payment Information</h2>

      <div className="mb-4">
        <label className="block font-semibold">Payment Method</label>
        <select
          name="method"
          value={paymentInfo.method}
          onChange={handleInputChange}
          className="border p-2 w-full rounded"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal (simulation)</option>
        </select>
      </div>

      {paymentInfo.method === "card" && (
        <>
          <div className="mb-4">
            <label className="block font-semibold">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleInputChange}
              placeholder="1234-5678-9012-3456"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mb-4 flex gap-2">
            <div className="flex-1">
              <label className="block font-semibold">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={paymentInfo.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="border p-2 w-full rounded"
              />
            </div>

            <div className="flex-1">
              <label className="block font-semibold">CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentSection;
