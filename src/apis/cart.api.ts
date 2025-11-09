import axios from "axios";
import type { ProductDTO } from "../types/dtos/product.dto";
import type {
  AddToCartRequest,
  AddToCartResponse,
} from "../types/dtos/cart.dto";
import { ACCESS_TOKEN } from "../constants";
import { API_BASE_URL } from "../types";

const getAuthHeader = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) throw new Error("No access token");
  return { Authorization: `Bearer ${token}` };
};

// --- add to cart ---
export const addToCartQuery = {
  name: "addToCart",
  fn: async ({
    userId,
    productId,
    quantity,
  }: AddToCartRequest): Promise<AddToCartResponse> => {
    // Gọi API mock cho có response
    const res = await axios.post(
      `${API_BASE_URL}/carts/add`,
      { userId, products: [{ id: productId, quantity }] },
      { headers: getAuthHeader() }
    );

    // ---- Giả lập lưu vào localStorage (vì dummyjson không lưu thật) ----
    const storageKey = `cart-${userId}`;
    const currentCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    // Kiểm tra xem product đã có trong giỏ chưa
    const existingProductIndex = currentCart.findIndex(
      (p: any) => p.id === productId
    );

    if (existingProductIndex >= 0) {
      // Nếu đã có => tăng số lượng
      currentCart[existingProductIndex].quantity += quantity;
    } else {
      // Nếu chưa có => thêm mới
      currentCart.push({
        id: productId,
        quantity,
        thumbnail: res.data?.products?.[0]?.thumbnail || "",
        title: res.data?.products?.[0]?.title || `Product ${productId}`,
        price: res.data?.products?.[0]?.price || 0,
      });
    }

    // Cập nhật localStorage
    localStorage.setItem(storageKey, JSON.stringify(currentCart));

    return res.data;
  },
};

export const getCartQuery = {
  name: "getCart",
  fn: async (userId: number): Promise<ProductDTO[]> => {
    //   const res = await axios.get(`https://dummyjson.com/carts/user/${userId}`, {
    //     headers: getAuthHeader(),
    //   });
    // console.log(res);
    const storedCart = localStorage.getItem(`cart-${userId}`);
    return storedCart ? JSON.parse(storedCart) : [];
  },
};

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
    const res = await axios.put(
      `https://dummyjson.com/carts/${userId}`,
      {
        merge: true, // giữ nguyên các product khác
        products: [
          {
            id: productId,
            quantity,
          },
        ],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // --- Cập nhật localStorage ---
    const storageKey = `cart-${userId}`;
    const currentCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const updatedCart = currentCart.map((p: any) =>
      p.id === productId ? { ...p, quantity } : p
    );

    localStorage.setItem(storageKey, JSON.stringify(updatedCart));
    return { success: true, products: updatedCart };
  },
};

export const removeProductQuery = {
  name: "removeProduct",
  fn: async ({ userId, productId }: { userId: number; productId: number }) => {
    const storageKey = `cart-${userId}`;

    // --- Lấy cart hiện tại từ localStorage ---
    const currentCart = JSON.parse(localStorage.getItem(storageKey) || "[]");

    // --- Xóa sản phẩm khỏi danh sách ---
    const updatedProducts = currentCart.filter((p: any) => p.id !== productId);

    // --- Gọi API cập nhật cart (dummyjson PUT) ---
    const res = await axios.put(
      `https://dummyjson.com/carts/${userId}`,
      { products: updatedProducts },
      { headers: { "Content-Type": "application/json" } }
    );

    // --- Cập nhật localStorage ---
    localStorage.setItem(storageKey, JSON.stringify(updatedProducts));

    console.log(
      "Removed product:",
      productId,
      "Updated cart:",
      updatedProducts
    );

    return {
      success: true,
      products: updatedProducts,
      response: res.data,
    };
  },
};
