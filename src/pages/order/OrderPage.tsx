import { useRef, useState } from "react";
import CSteppers from "../../components/molecules/cSteppers";
import type { ISteppersRef } from "../../components/molecules/cSteppers/types";
import CheckoutForm from "./CheckoutForm";
import {
  EShippingStep,
  shippingDefauftValue,
  type EShippingStepType,
} from "./const";
import OrderSummary from "./OrderSummary";
import PaymentSection from "./Payment";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useCartQuery } from "../../hooks/cart/useCartQuery.hook";
import { useForm } from "react-hook-form";
import {
  ShippingSchema,
  type TShippingSchema,
} from "../../validation/shipping.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CButton from "../../components/atoms/CButton/CButton";
import { FaArrowCircleLeft } from "react-icons/fa";
import type { TPaymentSchema } from "../../validation/payment.schema";
import { useClearCart } from "../../hooks/cart/useClearCart.hook";
import { useUpdateUserShipping } from "../../hooks/shipping/useUpdateUserShipping";
import type { ShippingInfoDTO } from "../../types/dtos/shipping.dto";
import OrderSuccessful from "./OrderSuccessful";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../routers/constants";
const resolver = zodResolver(ShippingSchema);

const OrderPage: React.FC = () => {
  const CStepperRef = useRef<ISteppersRef>(null);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<EShippingStepType>(
    EShippingStep.ViewOrder
  );
  const { isAuth, userId } = useAuthentication();
  const { cartQuery } = useCartQuery(userId);
  const { mutate: clearCart } = useClearCart(userId);
  const { mutate: updateUserShippingInfo } = useUpdateUserShipping();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const formInstance = useForm<TShippingSchema>({
    resolver,
    defaultValues: shippingDefauftValue,
    mode: "onChange",
  });

  const handleNextStep = () => {
    if (currentStep < EShippingStep.OrderSuccessful) {
      setCurrentStep((prev) => (prev + 1) as EShippingStepType);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > EShippingStep.ViewOrder) {
      setCurrentStep((prev) => (prev - 1) as EShippingStepType);
    }
  };

  const handleOrderComplete = (data: TPaymentSchema) => {
    //TODO: Call API to submit order shipping info +payment
    updateUserShippingInfo({
      userId: userId,
      shipping: formInstance.getValues() as ShippingInfoDTO,
    });
    clearCart();
    setOrderCompleted(true);
    setCurrentStep(EShippingStep.OrderSuccessful);
  };

  if (!isAuth) return <div>Please login to view your order.</div>;
  if (!cartQuery.data || cartQuery.data.length === 0)
    return <div>Your cart is empty.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <CSteppers
        numberStep={4}
        currentStep={currentStep}
        changeCurrentStep={setCurrentStep}
        ref={CStepperRef}
      />

      {currentStep === EShippingStep.ViewOrder && (
        <OrderSummary cartProducts={cartQuery.data} onNext={handleNextStep} />
      )}

      {currentStep === EShippingStep.InputShippingInfo && (
        <>
          <CheckoutForm
            onSubmitForm={handleNextStep}
            formInstance={formInstance}
          />
          <div className="mt-4">
            <CButton
              onClick={handlePrevStep}
              startIcon={<FaArrowCircleLeft />}
              size="medium"
              variant="outlined"
              isRounded
            >
              Back
            </CButton>
          </div>
        </>
      )}

      {currentStep === EShippingStep.Payment && (
        <>
          <PaymentSection onPaymentSubmit={handleOrderComplete} />
          <div className="mt-4">
            <CButton
              onClick={handlePrevStep}
              startIcon={<FaArrowCircleLeft />}
              size="medium"
              variant="outlined"
              className=""
              isRounded
            >
              Back
            </CButton>
          </div>
        </>
      )}

      {currentStep === EShippingStep.OrderSuccessful && orderCompleted && (
        <OrderSuccessful
          onContinueShopping={() => navigate(ROUTES_CONSTANTS.HOMEPAGE)}
        />
      )}
    </div>
  );
};
export default OrderPage;
