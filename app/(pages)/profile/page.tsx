"use client";

import Navbar from "../products/Navbar";
import { clearUser } from "@/app/redux/userSlice";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userName = user.name ?? "";

  const initials = userName
    ? userName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part: string) => part[0]?.toUpperCase())
        .join("")
    : "U";

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const request = await fetch("/api/logout", { method: "POST" });
      const response = await request.json();

      if (!response.success) {
        toast.error(response.error || "Unable to logout right now");
        return;
      }

      dispatch(clearUser());
      toast.success("Logged out successfully");
      router.replace("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e0f2fe,_#ffffff_45%,_#f8fafc_100%)] text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_55%,_#38bdf8_100%)] px-6 py-8 text-white sm:px-8 sm:py-10">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-100/80">
                My Profile
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-3xl font-semibold ring-1 ring-white/25">
                  {initials}
                </div>
                <div>
                  <h1 className="text-3xl font-semibold sm:text-4xl">
                    {user.name || "Loading your profile..."}
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-sky-100/85 sm:text-base">
                    Manage your account details, review your saved contact
                    information, and sign out securely from one place.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-100/70">
                    Account Email
                  </p>
                  <p className="mt-2 text-base font-medium text-white">
                    {user.email || "Fetching email..."}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                  <p className="text-xs uppercase tracking-[0.25em] text-sky-100/70">
                    Customer ID
                  </p>
                  <p className="mt-2 break-all text-base font-medium text-white">
                    {user._id || "Fetching id..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white px-6 py-8 sm:px-8 sm:py-10">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Saved Address
                </p>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  {user.address || "Your saved address will appear here once loaded."}
                </p>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 p-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  Account Actions
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Need to leave this device? Use logout to clear your session
                  safely.
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
