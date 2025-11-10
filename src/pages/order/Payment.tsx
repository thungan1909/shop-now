// PaymentForm.tsx
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentSchema,
  type TPaymentSchema,
} from "../../validation/payment.schema";
import CTextField from "../../components/atoms/CTextField/CTextField";
import CButton from "../../components/atoms/CButton/CButton";
import { Typography } from "@mui/material";
import { paymentDefaultValue } from "./const";

interface PaymentFormProps {
  onPaymentSubmit: (data: TPaymentSchema) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSubmit }) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<TPaymentSchema>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: paymentDefaultValue,
    mode: "onChange",
  });

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join("-") ?? "";
    setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const method = watch("method");

  return (
    <form
      className="flex flex-col gap-5 border p-4 rounded"
      onSubmit={handleSubmit(onPaymentSubmit)}
    >
      <Controller
        name="method"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Payment Method</label>
            <select {...field} className="border p-2 w-full rounded">
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal (simulation)</option>
            </select>
          </div>
        )}
      />

      {method === "card" && (
        <>
          <Controller
            name="cardNumber"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="text"
                  label="Card Number"
                  placeholder="1234-5678-9012-3456"
                  className="w-full"
                  required
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <div className="flex gap-2">
            <Controller
              name="expiryDate"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex-1 flex flex-col">
                  <CTextField
                    {...field}
                    type="text"
                    label="Expiry Date"
                    placeholder="MM/YY"
                    required
                  />
                  {fieldState.error && (
                    <Typography
                      color="error"
                      variant="caption"
                      className="mt-1"
                    >
                      {fieldState.error.message}
                    </Typography>
                  )}
                </div>
              )}
            />

            <Controller
              name="cvv"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex-1 flex flex-col">
                  <CTextField
                    {...field}
                    type="text"
                    label="CVV"
                    placeholder="123"
                    required
                  />
                  {fieldState.error && (
                    <Typography
                      color="error"
                      variant="caption"
                      className="mt-1"
                    >
                      {fieldState.error.message}
                    </Typography>
                  )}
                </div>
              )}
            />
          </div>
        </>
      )}

      <CButton
        type="submit"
        disabled={!isValid}
        className="w-full py-3"
        isRounded
      >
        Pay Now
      </CButton>
    </form>
  );
};

export default PaymentForm;
