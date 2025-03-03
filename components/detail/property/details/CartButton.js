import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "@/components/icons/Bag";
import Spinner from "@/components/shared/spinner/Spinner";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";

const CartButton = ({ product }) => {
  const [qty, setQty] = useState(1);

  const [
    addToCart,
    { isLoading: addingToCart, data: cartData, error: cartError }
  ] = useAddToCartMutation();

  useEffect(() => {
    if (addingToCart) {
      toast.loading("Adding to cart...", { id: "addToCart" });
    }

    if (cartData) {
      toast.success(cartData?.description, { id: "addToCart" });
      setQty(1);
    }
    if (cartError?.data) {
      toast.error(cartError?.data?.description, { id: "addToCart" });
    }
  }, [addingToCart, cartData, cartError]);
  const [selectedUnit, setSelectedUnit] = useState(product?.variations?.[0]);

  // تغییر واحد زمانی که کاربر روی دکمه کلیک می‌کند
  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };
  const originalPrice = selectedUnit?.price || 0;
  const discountedPrice =
    product?.discountAmount > 0
      ? originalPrice * (1 - product.discountAmount / 100)
      : originalPrice;
  return (
    <section className="flex flex-row items-center gap-x-4">
      <div className="flex-flex-col gap-y-8">
        <div className="flex flex-col gap-y-12">
          <div className="flex gap-x-2 items-center">
            {discountedPrice < originalPrice && (
              <span className="text-red-500 block line-through text-sm">
                {originalPrice.toLocaleString("fa-IR")} ریال
              </span>
            )}

            <span className="text-green-500 block text-lg !leading-none">
              {discountedPrice > 0
                ? `${discountedPrice.toLocaleString("fa-IR")} ریال`
                : `${originalPrice.toLocaleString("fa-IR")} ریال`}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-4 items-center gap-4">
          <button
            className="px-8 py-2 border border-primary rounded-secondary bg-primary hover:bg-primary/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
            disabled={qty === 0 || addingToCart}
            onClick={() => {
              addToCart({
                product: product._id,
                quantity: qty,
                unit: selectedUnit?.unit._id
              });
            }}
          >
            {addingToCart ? (
              <Spinner />
            ) : (
              <>
                <Bag />
                <span className="md:hidden text-white">افزودن</span>
                <span className="md:flex hidden text-white">
                  درخواست مشاروه{" "}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartButton;
