"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/app/redux/userSlice";

export default function useLoadUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/me", { method: "GET" });
        const data = await res.json();

        if (data.success && data.user) {
          dispatch(setUser(data.user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      }
    };

    load();
  }, [dispatch]);
}