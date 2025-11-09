import CButton from "../../components/atoms/CButton/CButton";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useAddToCart } from "../../hooks/cart/useAddToCart.hook";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { notify } from "../../utils/notifyUtils";
import { useQueryClient } from "@tanstack/react-query";

interface ProductProps {
  product: ProductDTO;
}

const ProductItem = ({ product }: ProductProps) => {
  const { isAuth, userId } = useAuthentication();
  const queryClient = useQueryClient();

  const { mutate: addToCart } = useAddToCart({
    onSuccess: () => {
      queryClient.setQueryData<ProductDTO[]>(
        ["cart", userId],
        (oldCart = []) => {
          return [...oldCart, { ...product, quantity: 1 }];
        }
      );

      notify.success("Added to cart successfully");
    },
  });

  const addCartOnClick = () => {
    if (!isAuth) {
      notify.warning("Please login to add products to your cart.");
      return;
    }

    addToCart({
      userId: userId || 1,
      productId: product.id,
      quantity: 1,
    });
  };

  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-md transition">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-500">${product.price}</p>
      <CButton
        onClick={addCartOnClick}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Add to Cart
      </CButton>
    </div>
  );
};

export default ProductItem;
