"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setCartOpen, toggleCart } from "@/app/redux/cartSlice";
import Cart from "./Cart";

type NavbarProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
};

const Navbar = ({ searchValue = "", onSearchChange }: NavbarProps) => {
  const user = useSelector((state: RootState) => state.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartOpen = useSelector((state: RootState) => state.cart.cartOpen);
  const dispatch = useDispatch();
  const cartRef = useRef<HTMLDivElement>(null);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!cartRef.current?.contains(event.target as Node)) {
        dispatch(setCartOpen(false));
      }
    };

    if (cartOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [cartOpen, dispatch]);

  return (
    <div
      className="
      grid grid-cols-3
      px-4 py-3 gap-3
      bg-gray-800 text-gray-50
    ">
      <div className="flex items-center">
        <h1 className="lg:text-2xl font-bold">Shopeee</h1>
      </div>
      <div className="
        flex items-center gap-2
        border border-gray-400 rounded-full
        px-3 py-2
        w-full
      ">
        <input
          type="text"
          placeholder="Search products..."
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          className="flex-1 outline-none bg-transparent text-sm border-0"
        />
        <img
          src="https://img.icons8.com/?size=100&id=12773&format=png&color=000000"
          alt="search"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="relative" ref={cartRef}>
          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="relative rounded-full border border-gray-500 bg-gray-700 p-2 transition hover:bg-gray-600"
          >
            <img
              src="https://img.icons8.com/?size=100&id=HCAOOt9bFn4S&format=png&color=000000"
              alt="cart"
              className="h-6 w-6 sm:h-7 sm:w-7"
            />
            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-400 px-1 text-xs font-bold text-slate-950">
                {totalQuantity}
              </span>
            )}
          </button>

          {cartOpen && <Cart />}
        </div>

        {!user?.name ? (
          <Link href="/login" className="text-sm sm:text-base">
            Login
          </Link>
        ) : (
          <Link href="/profile" className="text-sm sm:text-base">
            Welcome {user.name}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
