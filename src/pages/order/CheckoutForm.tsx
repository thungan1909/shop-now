import React from "react";
import CButton from "../../components/atoms/CButton/CButton";
import { Controller } from "react-hook-form";
import type { CheckoutFormProps } from "./types";
import CTextField from "../../components/atoms/CTextField/CTextField";
import { Typography } from "@mui/material";

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmitForm,
  formInstance,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = formInstance;

  return (
    <div>
      {/* Shipping Form */}
      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Shipping Information</h2>

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <Controller
            name="recipientName"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="text"
                  label="Recipient Name"
                  placeholder="Enter recipient name"
                  className="w-full"
                  required
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="text"
                  label="Phone"
                  placeholder="Enter phone number"
                  className="w-full"
                  required
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="Enter email"
                  className="w-full"
                  required
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="postalCode"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="text"
                  label="Postal Code"
                  placeholder="Enter postal code"
                  className="w-full"
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="streetAddress"
            control={control}
            render={({ field, fieldState }) => (
              <div className="flex flex-col">
                <CTextField
                  {...field}
                  type="text"
                  label="Street Address"
                  placeholder="Enter street address"
                  className="w-full"
                />
                {fieldState.error && (
                  <Typography color="error" variant="caption" className="mt-1">
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />

          <Controller
            name="detailAddress"
            control={control}
            render={({ field }) => (
              <CTextField
                {...field}
                type="text"
                label="Detail Address"
                placeholder="Enter detail address "
                className="w-full"
                required
              />
            )}
          />

          <Controller
            name="deliveryNote"
            control={control}
            render={({ field }) => (
              <CTextField
                {...field}
                type="text"
                label="Delivery Note"
                placeholder="Enter delivery note"
                className="w-full"
              />
            )}
          />

          <CButton
            type="submit"
            disabled={!isValid}
            className="w-full py-3 text-lg font-medium"
            isRounded
          >
            Submit
          </CButton>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
