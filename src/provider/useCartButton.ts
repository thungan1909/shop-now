import { useContext } from "react";
import { CartButtonContext } from "./CartButtonContext";

export const useCartButton = () => {
  const context = useContext(CartButtonContext);
  if (!context)
    throw new Error("useCartButton must be used within CartButtonProvider");
  return context;
};
