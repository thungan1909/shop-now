import { useAnimation, motion } from "framer-motion";
import { useAuthentication } from "../../hooks/auth/login.hook";
import { useAddToCart } from "../../hooks/cart/useAddToCart.hook";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "../../utils/notifyUtils";
import type { ProductDTO } from "../../types/dtos/product.dto";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import ProductDetailModal from "./ProductDetailModal";
import { useCartButton } from "../../provider/useCartButton";

interface ProductProps {
  product: ProductDTO;
}

interface ProductProps {
  product: ProductDTO;
}

const ProductItem = ({ product }: ProductProps) => {
  const { isAuth, userId } = useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <div className="relative border rounded-xl p-3 shadow hover:shadow-lg transition bg-white">
        {/* Add to Cart Icon Button */}
        <button
          onClick={addCartOnClick}
          className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow"
        >
          <FaShoppingCart size={18} />
        </button>

        <motion.img
          id={`product-img-${product.id}`}
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-lg mb-3"
          animate={controls}
          onClick={() => setIsModalOpen(true)}
        />

        <h3 className="font-semibold text-base truncate">{product.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-gray-600 font-medium">${product.price}</p>
          <span className="text-yellow-500 text-sm">
            ★ {product.rating || "4.5"}
          </span>
        </div>
      </div>
      <ProductDetailModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addCartOnClick}
      />
    </>
  );
};

export default ProductItem;
