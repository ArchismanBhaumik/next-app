"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/userSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDetails>();
  const router = useRouter();
  const onSubmit = async (loginData: LoginDetails) => {
    console.log("logindata", loginData);
    try {
      const request = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const response = await request.json();
      if (!response.success) {
        toast.error(response.error || "Error Logging in!");
        console.log(response.error);
        return;
      } else {
        toast.success("Login SuccessFull!");
        dispatch(setUser(response.user));
        router.push("/");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.log(error);
    }
  };

  return (
    <div className="p-5 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full border rounded p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters required" },
            })}
            className="w-full border rounded p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <Link href={"/signup"} className="text-blue-700 underline">
          Don&apos;t Have an Account? Sign in
        </Link>
      </form>
    </div>
  );
};

export default LoginComponent;
