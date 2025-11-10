import { useAnimation, motion } from "framer-motion";
import CButton from "../../components/atoms/CButton/CButton";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useAddToCart } from "../../hooks/cart/useAddToCart.hook";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "../../utils/notifyUtils";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { useCartButton } from "../../layout/CartButtonProvider";

interface ProductProps {
  product: ProductDTO;
}

const ProductItem = ({ product }: ProductProps) => {
  const { isAuth, userId } = useAuthentication();
  const queryClient = useQueryClient();
  const controls = useAnimation();
  const { cartButtonRef } = useCartButton();

  const { mutate: addToCart } = useAddToCart({
    onSuccess: () => {
      queryClient.setQueryData<ProductDTO[]>(
        ["cart", userId],
        (oldCart = []) => [...oldCart, { ...product, quantity: 1 }]
      );

      if (cartButtonRef.current) {
        const img = document.getElementById(`product-img-${product.id}`);
        const cartBtn = cartButtonRef.current;

        if (img) {
          const imgRect = img.getBoundingClientRect();
          const cartRect = cartBtn.getBoundingClientRect();

          const flyImg = img.cloneNode(true) as HTMLImageElement;
          flyImg.style.position = "fixed";
          flyImg.style.left = `${imgRect.left}px`;
          flyImg.style.top = `${imgRect.top}px`;
          flyImg.style.width = `${imgRect.width}px`;
          flyImg.style.height = `${imgRect.height}px`;
          flyImg.style.zIndex = "1000";
          flyImg.style.pointerEvents = "none";
          document.body.appendChild(flyImg);

          const deltaX =
            cartRect.left +
            cartRect.width / 2 -
            (imgRect.left + imgRect.width / 2);
          const deltaY =
            cartRect.top +
            cartRect.height / 2 -
            (imgRect.top + imgRect.height / 2);

          flyImg.animate(
            [
              { transform: "translate(0,0) scale(1)", opacity: 1 },
              {
                transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2)`,
                opacity: 0.5,
              },
            ],
            { duration: 800, easing: "ease-in-out" }
          ).onfinish = () => {
            document.body.removeChild(flyImg);
          };
        }
      }

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
      <motion.img
        id={`product-img-${product.id}`}
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-32 object-cover rounded mb-2"
        animate={controls}
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
