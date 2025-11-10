import type { ProductDTO } from "../types/dtos/product.dto";
import type {
  AddToCartRequest,
  AddToCartResponse,
} from "../types/dtos/cart.dto";
import { axiosInstance } from "./axiosInstance";

// --- Add to cart ---
export const addToCartQuery = {
  name: "addToCart",
  fn: async ({
    userId,
    productId,
    quantity,
  }: AddToCartRequest): Promise<AddToCartResponse> => {
    // Gọi API mock
    const res = await axiosInstance.post("/carts/add", {
      userId,
      products: [{ id: productId, quantity }],
    });

    // Cập nhật localStorage
    const storageKey = `cart-${userId}`;
    const currentCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const existingIndex = currentCart.findIndex((p: any) => p.id === productId);
    if (existingIndex >= 0) {
      currentCart[existingIndex].quantity += quantity;
    } else {
      currentCart.push({
        id: productId,
        quantity,
        thumbnail: res.data?.products?.[0]?.thumbnail || "",
        title: res.data?.products?.[0]?.title || `Product ${productId}`,
        price: res.data?.products?.[0]?.price || 0,
      });
    }

    localStorage.setItem(storageKey, JSON.stringify(currentCart));
    return res.data;
  },
};

// --- Get cart ---
export const getCartQuery = {
  name: "getCart",
  fn: async (userId: number): Promise<ProductDTO[]> => {
    // const res = await axiosInstance.get(`/carts/user/${userId}`);
    const storageKey = `cart-${userId}`;
    const storedCart = localStorage.getItem(storageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  },
};

// --- Update quantity ---
export const updateQuantityQuery = {
  name: "updateQuantity",
  fn: async ({
    userId,
    productId,
    quantity,
  }: {
    userId: number;
    productId: number;
    quantity: number;
  }) => {
    const storageKey = `cart-${userId}`;
    const currentCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const updatedCart = currentCart.map((p: any) =>
      p.id === productId ? { ...p, quantity } : p
    );

    // Gọi API mock
    await axiosInstance.put(`/carts/${userId}`, { products: updatedCart });

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    return { success: true, products: updatedCart };
  },
};

// --- Remove product ---
export const removeProductQuery = {
  name: "removeProduct",
  fn: async ({ userId, productId }: { userId: number; productId: number }) => {
    const storageKey = `cart-${userId}`;
    const currentCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const updatedProducts = currentCart.filter((p: any) => p.id !== productId);

    // Gọi API mock
    const res = await axiosInstance.put(`/carts/${userId}`, {
      products: updatedProducts,
    });

    localStorage.setItem(storageKey, JSON.stringify(updatedProducts));
    return { success: true, products: updatedProducts, response: res.data };
  },
};

// --- Clear cart ---
export const clearCartQuery = {
  name: "clearCart",
  fn: async ({ userId }: { userId: number }) => {
    // Clear local storage
    localStorage.removeItem(`cart-${userId}`);

    // Delete cart on server
    const response = await axiosInstance.delete(`/carts/${userId}`);

    return response.data; // e.g., { success: true }
  },
};
