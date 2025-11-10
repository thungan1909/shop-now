import { createContext, useRef } from "react";
/* eslint-disable react-refresh/only-export-components */
interface CartButtonContextType {
  cartButtonRef: React.RefObject<HTMLButtonElement | null>;
}

export const CartButtonContext = createContext<CartButtonContextType | null>(
  null
);

export const CartButtonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <CartButtonContext.Provider value={{ cartButtonRef }}>
      {children}
    </CartButtonContext.Provider>
  );
};
