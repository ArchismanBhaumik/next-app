"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const SignUpComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUp>();
  const router = useRouter();
  const onSubmit = async (data: SignUp) => {
    console.log(data);
    const requestBody = {
        name:data.name,
        email:data.email,
        password:data.password,
        address:data.address
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("registered successfully!");
        console.log("Signup Data:", data);
        reset();
        router.push('/login');
      }else{
        toast.error("Something went wrong");
        console.log(result)
      }
    } catch (error: any) {
      toast.error("Error:", error);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 border rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Address"
            {...register("address", {
              required: "Please confirm Address",
            })}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm">
              {errors.address.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUpComponent;
