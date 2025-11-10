// CartButtonContext.tsx
import { createContext, useContext, useRef } from "react";
interface CartButtonContextType {
  cartButtonRef: React.RefObject<HTMLButtonElement | null>;
}
const CartButtonContext = createContext<CartButtonContextType | null>(null);

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

export const useCartButton = () => {
  const context = useContext(CartButtonContext);

  if (!context)
    throw new Error("useCartButton must be used within CartButtonProvider");
  return context;
};
