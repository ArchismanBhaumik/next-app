"use client";

import Link from "next/link";
import { RootState } from "@/app/redux/store";
import {
  decreaseQuantity,
  removeFromCart,
  setCartOpen,
} from "@/app/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <div className="absolute right-0 top-14 z-50 w-[min(92vw,24rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-[0_20px_70px_rgba(15,23,42,0.18)]">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <p className="text-sm text-slate-500">No items added yet.</p>
        </div>
        <div className="px-5 py-8 text-center text-sm text-slate-500">
          Start adding products to see them here.
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-14 z-50 w-[min(92vw,24rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-[0_20px_70px_rgba(15,23,42,0.18)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <p className="text-sm text-slate-500">
          {items.length} {items.length === 1 ? "item" : "items"} ready to
          checkout
        </p>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                ${item.price} x {item.quantity}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  -
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-slate-700">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                >
                  Remove
                </button>
              </div>
            </div>

            <p className="self-start text-sm font-semibold text-slate-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <Link
          href="/checkout"
          onClick={() => dispatch(setCartOpen(false))}
          className="flex w-full items-center justify-between rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <span>Go to Checkout</span>
          <span>${totalCost.toFixed(2)}</span>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
