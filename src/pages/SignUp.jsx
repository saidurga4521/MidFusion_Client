import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "../index.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    navigate("/otp", { state: { data } });
  };

  const handleGoogleOAuth = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    window.location.href = `${BASE_URL}/user/google`;
  };

  const handleFbOAuth = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    window.location.href = `${BASE_URL}/user/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transition-all duration-300 transform scale-100 opacity-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
          >
            Log in
          </Link>
        </p>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div className="space-y-4">
          {/* Google Button */}
          <button
            onClick={handleGoogleOAuth}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={handleFbOAuth}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-4 py-2.5 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <FaFacebook size={20} className="text-blue-600" />
            <span>Continue with Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
