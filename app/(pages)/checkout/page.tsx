"use client";

import Navbar from "../products/Navbar";
import Link from "next/link";
import { RootState } from "@/app/redux/store";
import { clearCart } from "@/app/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const items = useSelector((state: RootState) => state.cart.items);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    dispatch(clearCart());
    toast.success("Order placed successfully");
    router.replace("/");

  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Review your items before placing the order.
                </p>
              </div>
              <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {items.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
                  <p className="text-lg font-semibold text-slate-900">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Add some products to continue shopping.
                  </p>
                  <Link
                    href="/products"
                    className="mt-6 inline-flex rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-lg font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-emerald-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Order Summary
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-lg font-semibold text-white">
                <span>Total</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            
            >
              Place Order for ${totalCost.toFixed(2)}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
